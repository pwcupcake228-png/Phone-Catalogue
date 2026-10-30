import { Dialog, Form } from 'radix-ui';
import { Typography } from '../../atoms/Typography/Typography';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../../../services/supabase';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

const variant = {
  default:
    'border-elements px-3 py-2 rounded-lg bg-hover-bg dark:bg-surface-2-dark border text-primary dark:text-white text-sm focus:outline-none focus:border-primary dark:focus:border-white transition-colors',
};

type Props = {
  onCloseModal: () => void;
  isOpen: boolean;
};

export const SignInModal: React.FC<Props> = ({ onCloseModal, isOpen }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const notifySignUp = () => toast.success('Registration successful!');
  const notifySignIn = () => toast.success('You have successfully signed in!');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          setErrorMessage(error.message);

          return;
        }

        if (data.session) {
          notifySignUp();
          onCloseModal();
        } else {
          setSuccessMessage('Check your email to confirm your account.');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMessage('Invalid email or password.');

          return;
        }

        notifySignIn();
        onCloseModal();
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={open => {
        if (!open) {
          onCloseModal();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-51 w-5/6 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-elements bg-white p-4 shadow-2xl sm:w-100 md:p-6 dark:border-surface-2-dark dark:bg-surface-1-dark">
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Close dialog"
              className="absolute right-4 top-4 border-0 transition-transform hover:scale-110 md:right-6 md:top-6"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </Dialog.Close>

          <Dialog.Title asChild>
            <h2 className="mb-3 font-bold font-mont text-xl text-primary dark:text-white md:mb-6">
              {mode === 'signin' ? 'Sign in' : 'Create account'}
            </h2>
          </Dialog.Title>

          <Dialog.Description className="sr-only">
            Sign in to your account or create a new account.
          </Dialog.Description>

          <Form.Root onSubmit={handleSubmit}>
            {errorMessage && (
              <Typography level="body" className="text-red">
                {errorMessage}
              </Typography>
            )}

            {successMessage && (
              <Typography level="body" className="text-primary">
                {successMessage}
              </Typography>
            )}

            <Form.Field className="mb-4 grid" name="email">
              <div className="flex items-baseline justify-between">
                <Form.Label>
                  <Typography className="text-xs font-medium text-secondary dark:text-white">
                    Email address
                  </Typography>
                </Form.Label>

                <Form.Message className="opacity-90" match="valueMissing">
                  <Typography level="body" className="text-red">
                    Please enter your email
                  </Typography>
                </Form.Message>

                <Form.Message className="opacity-90" match="typeMismatch">
                  <Typography level="body" className="text-red">
                    Please provide a valid email
                  </Typography>
                </Form.Message>
              </div>

              <Form.Control asChild>
                <input
                  name="email"
                  className={variant.default}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </Form.Control>
            </Form.Field>

            <Form.Field className="mb-4 grid" name="password">
              <div className="flex items-baseline justify-between">
                <Form.Label>
                  <Typography className="text-xs font-medium text-secondary dark:text-white">
                    Password
                  </Typography>
                </Form.Label>

                <Form.Message className="opacity-90" match="valueMissing">
                  <Typography level="body" className="text-red">
                    Please enter your password
                  </Typography>
                </Form.Message>

                <Form.Message className="opacity-90" match="tooShort">
                  <Typography level="body" className="text-red">
                    At least 6 characters
                  </Typography>
                </Form.Message>
              </div>

              <Form.Control asChild>
                <input
                  className={variant.default}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
              </Form.Control>
            </Form.Field>

            <Form.Submit asChild>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-primary text-sm text-white transition-all hover:cursor-pointer hover-zoom-small dark:bg-accent-dark dark:hover:bg-accent-hover-dark"
              >
                {isSubmitting
                  ? 'Please wait...'
                  : mode === 'signin'
                    ? 'Sign in'
                    : 'Create account'}
              </button>
            </Form.Submit>

            <button
              type="button"
              className="mt-4 w-full text-sm text-primary underline dark:text-white"
              onClick={() => {
                setMode(current =>
                  current === 'signin' ? 'signup' : 'signin',
                );
                setErrorMessage('');
                setSuccessMessage('');
              }}
            >
              {mode === 'signin'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
