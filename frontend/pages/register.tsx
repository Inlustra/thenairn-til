import React, { useEffect, useState } from "react";
import { Text } from "../framework/elements/Text";
import { Container } from "../framework/layout/Container";
import { Body, Hero } from "../framework/layout/Hero";
import { Topbar } from "_components/Topbar";
import { Box } from "@devtale/ui/elements/Box";
import { FlexContainer } from "@devtale/ui/layout/FlexContainer";
import { Input } from "@devtale/ui/elements/Input";
import { Button, Link } from "@devtale/ui/elements/Button";
import { Columns, Column } from "@devtale/ui/layout/Columns";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "generated/graphql";
import NextLink from "next/link";

interface FormValues {
  email: string;
  username: string;
  password: string;
}

export default () => {
  const { register: registerField, handleSubmit, errors } = useForm<FormValues>(
    {
      defaultValues: {
        email: "",
        username: "",
        password: ""
      }
    }
  );
  const [queryError, setQueryError] = useState<React.ReactNode | null>(null);

  const [register, { loading, error }] = useRegisterMutation();
  useEffect(() => {
    if (!error) {
      setQueryError(null);
    } else {
      setQueryError(
        error.graphQLErrors.map(({ message }) => message).join(", ")
      );
    }
  }, [error]);
  const onSubmit = handleSubmit(async (values: FormValues) => {
    try {
      const { data } = await register({
        variables: {
          register: values
        }
      });
      console.log(data?.register);
    } catch (error) {
      console.error(error);
    }
  });
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
                        Register
                      </Text>
                      <NextLink href="/login">
                        <Link>Login</Link>
                      </NextLink>
                      <Text weight={"bold"} margin={{ t: "md" }}>
                        Email
                      </Text>
                      <Input
                        name="email"
                        ref={registerField({
                          required: "Email is required"
                        })}
                        margin={{
                          t: "sm"
                        }}
                      />
                      {errors.email && (
                        <Text color="danger">{errors.email.message}</Text>
                      )}
                      <Text weight={"bold"} margin={{ t: "md" }}>
                        Username
                      </Text>
                      <Input
                        name="username"
                        ref={registerField({
                          required: "Username is required"
                        })}
                        margin={{
                          t: "sm"
                        }}
                      />
                      {errors.username && (
                        <Text color="danger">{errors.username.message}</Text>
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
                        ref={registerField({
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
