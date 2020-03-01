import React, { useEffect, useState } from "react";
import { Text } from "../framework/elements/Text";
import { Container } from "../framework/layout/Container";
import { Body, Hero } from "../framework/layout/Hero";
import { Topbar } from "_components/Topbar";
import { Box } from "@devtale/ui/elements/Box";
import { FlexContainer } from "@devtale/ui/layout/FlexContainer";
import { Input } from "@devtale/ui/elements/Input";
import { Button } from "@devtale/ui/elements/Button";
import { Columns, Column } from "@devtale/ui/layout/Columns";
import { useLazyQuery } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";
import {
  LoginDocument,
  LoginQuery,
  LoginQueryVariables
} from "generated/graphql";

interface FormValues {
  email: string;
  password: string;
}

export default () => {
  const { register, handleSubmit, errors } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const [queryError, setQueryError] = useState<React.ReactNode | null>(null);
  const [login, { loading, data, error }] = useLazyQuery<
    LoginQuery,
    LoginQueryVariables
  >(LoginDocument);
  useEffect(() => console.log(data), [data]);
  useEffect(() => {
    if (!error) {
      setQueryError(null);
    } else {
      setQueryError(
        error.graphQLErrors.map(({ message }) => message).join(", ")
      );
    }
  }, [error]);
  const onSubmit = handleSubmit((variables: FormValues) =>
    login({
      variables
    })
  );
  return (
    <>
      <Topbar />
      <Hero fullHeight bold color="danger">
        <Body>
          <Container>
            <Columns centered mobile>
              <Column
                size={{
                  mobile: 11,
                  tablet: 8,
                  desktop: 4,
                  fullhd: 2
                }}
              >
                <Box>
                  <form onSubmit={onSubmit}>
                    <FlexContainer column>
                      <Text size={4} centered weight={"bold"}>
                        Login
                      </Text>
                      <Text weight={"bold"} margin={{ t: "md" }}>
                        Email
                      </Text>
                      <Input
                        name="email"
                        ref={register({
                          required: "Email is required"
                        })}
                        margin={{
                          t: "sm"
                        }}
                      />
                      {errors.email && (
                        <Text color="danger">{errors.email.message}</Text>
                      )}
                      <Text
                        weight={"bold"}
                        margin={{
                          t: "md"
                        }}
                      >
                        Password
                      </Text>
                      <Input
                        name="password"
                        ref={register({
                          required: "Password is required"
                        })}
                        margin={{
                          t: "sm"
                        }}
                      />
                      {errors.password && (
                        <Text color="danger">{errors.password.message}</Text>
                      )}
                      {queryError && (
                        <Box margin={{ t: "md" }}>
                          <Text color="danger">{queryError}</Text>
                        </Box>
                      )}
                      <Button
                        color="primary"
                        loading={loading}
                        type="submit"
                        margin={{
                          t: "lg"
                        }}
                      >
                        Submit
                      </Button>
                    </FlexContainer>
                  </form>
                </Box>
              </Column>
            </Columns>
          </Container>
        </Body>
      </Hero>
    </>
  );
};