import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { login } from '../Actions/auth';

export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: '', password: '' });

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError({ ...error, email: '' });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError({ ...error, password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await dispatch(login(email, password))
      .then(() => {
        window.location.reload();
        navigate('/');
      })
      .catch(() => {
        const error = message;
        setError({
          ...error,
          email: error,
          password: error,
        });

        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={{
          fontWeight: 900,
        }}
      >
        Login page
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Link to="/register">
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            name="email"
            type="email"
            label="Email"
            placeholder="you@email.com"
            value={email}
            onChange={handleEmailChange}
            error={error.email}
            required
          />
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={handlePasswordChange}
            error={error.password}
            required
            mt="md"
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button
            className="bg-gray-800 hover:bg-gray-700 transition-all duration-300"
            fullWidth
            mt="xl"
            loading={loading}
            type="submit"
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
