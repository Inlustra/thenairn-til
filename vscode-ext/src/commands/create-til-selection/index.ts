import { window, commands } from "vscode";
import { Subject, BehaviorSubject } from "rxjs";
import TilService from "../../services/til";
import {
  switchMap,
  debounce,
  debounceTime,
  skipWhile,
  elementAt,
  tap,
  map
} from "rxjs/operators";
import { Logger } from "../../logger";
import { Tag } from "../../generated/graphql";

function createTilSelection(tilSvc: TilService) {
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }
  if (!editor.selection) {
    return;
  }
  const quickPick = window.createQuickPick();
  quickPick.canSelectMany = true;
  quickPick.ignoreFocusOut = true;
  const input$ = new Subject<string>();
  quickPick.onDidChangeValue(value => {
    input$.next(value);
  });

  const availableTags$ = new BehaviorSubject<Tag[]>([]);
  const tagsSubscription = input$
    .pipe(
      tap(input => Logger.debug(`Changed input value: ${input}`)),
      debounceTime(300),
      skipWhile(element => !element),
      tap(() => (quickPick.busy = true)),
      switchMap(input => tilSvc.findTags(input)),
      tap(tags => Logger.debug(`Matching tags: ${JSON.stringify(tags)}`)),
      tap(() => (quickPick.busy = false))
    )
    .subscribe(availableTags$);

  const itemsSubscription = availableTags$.subscribe(tags => {
    quickPick.items = [
      ...quickPick.items.filter(item => !!item.picked), // TODO: Dedupe the picked items
      ...tags
    ];
  });

  const buttonsSubscription = availableTags$
    .pipe(map(tags => tags.length > 0))
    .subscribe(hasTags => {
      if (!hasTags && quickPick.value && !quickPick.busy) {
        quickPick.buttons = [
          {
            iconPath: ":plus:",
            tooltip: "Create Tag"
          }
        ];
      } else {
        quickPick.buttons = [];
      }
    });

  quickPick.onDidAccept(console.error);
  quickPick.onDidTriggerButton(console.error);
  quickPick.onDidHide(() => {
    tagsSubscription.unsubscribe();
    buttonsSubscription.unsubscribe();
    itemsSubscription.unsubscribe();
  });
  quickPick.show();
}

export const registerCreateTilSelectionCommand = (tilSvc: TilService) =>
  commands.registerCommand("extension.createTilSelection", () =>
    createTilSelection(tilSvc)
  );
