import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { register } from '../Actions/auth';

export default function Register() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: '', password: '' });

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

    await dispatch(register(email, password))
      .then(() => {
        toast.success('User Registered');
        setLoading(false);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch(() => {
        if (String(message).includes('Email')) {
          setError({ ...error, email: message });
        } else {
          setError({ ...error, password: message });
        }
        setLoading(false);
      });
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={{
          fontWeight: 900,
        }}
      >
        Registeration page
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{' '}
        <Link to="/login">
          <Anchor size="sm" component="button">
            login here
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
          <div className="mt-5 flex">
            <Checkbox label="I agree with to the" />
            <Anchor className="ml-1" component="button" size="sm">
              Terms &amp; Conditions
            </Anchor>
          </div>
          <Button
            className="bg-gray-800 hover:bg-gray-700 transition-all duration-300"
            fullWidth
            mt="xl"
            loading={loading}
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </Paper>
      <Toaster />
    </Container>
  );
}
