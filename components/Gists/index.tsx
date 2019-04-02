import Octokit, { GistsListPublicForUserResponseItemFilesHelloWorldRb } from "@octokit/rest";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Props as TilProps, Til } from "../Til/Til";

const octokit = new Octokit();

const GistTil = ({
  gist,
  ...rest
}: {
  gist: Octokit.GistsListPublicForUserResponseItem;
} & Partial<TilProps>) => {
  const [til, setTil] = useState<TilProps | undefined>();
  useEffect(() => {
    const firstGistFile:
      | GistsListPublicForUserResponseItemFilesHelloWorldRb
      | undefined = Object.keys(gist.files).map(
      fileKey => (gist.files as any)[fileKey]
    )[0];
    if (!firstGistFile) {
      return;
    }
    if (firstGistFile.language) {
      fetch(firstGistFile.raw_url)
        .then(response => response.text())
        .then(code => {
          setTil({
            title: gist.description || firstGistFile.filename,
            language: firstGistFile.language,
            code
          });
        })
        .catch(() => {});
    }
    return () => {};
  }, []);
  const icons = [
    ...new Set(
      Object.keys(gist.files)
        .map(
          file =>
            (gist.files as any)[
              file
            ] as GistsListPublicForUserResponseItemFilesHelloWorldRb
        )
        .map(file => file.language)
    )
  ]
    .filter(language => !!language)
    .map(language => language.toLowerCase());

  if (!til) return null;
  return (
    <Til icons={icons} left="Gist" link={gist.html_url} {...til} {...rest} />
  );
};

export type Props = {
  username: string;
};

const SpacerDiv = styled.div`
  margin-bottom: 32px;
`;

const Gists: React.FC<Props> = ({ username }) => {
  const [expandedGist, setExpandedGist] = useState<string | undefined>();
  const [gists, setGists] = useState<
    Octokit.GistsListPublicForUserResponseItem[]
  >([]);
  useEffect(() => {
    octokit.gists
      .listPublicForUser({
        username
      })
      .then(gists => setGists(gists.data))
      .catch(() => {});
    return () => {};
  }, []);
  return (
    <>
      {gists.map(gist => (
        <SpacerDiv key={gist.id}>
          <GistTil
            gist={gist}
            expanded={expandedGist === gist.id}
            onClickMedia={() => setExpandedGist(gist.id)}
          />
        </SpacerDiv>
      ))}
    </>
  );
};

export default React.memo(Gists);
