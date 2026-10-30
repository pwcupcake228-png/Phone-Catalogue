import type React from 'react';
import { useState } from 'react';
import { Dialog } from 'radix-ui';
import { Typography } from '../../atoms/Typography/Typography';
import { ButtonSelect } from '../../atoms/Buttons/ButtonSelect';
import { Input } from '../../atoms/Input/Input';

type Props = {
  isOpen: boolean;
  totalSum: number;
  itemCount: number;
  onClose: () => void;
  onSubmit: (formData: {
    name: string;
    address: string;
    phone: string;
  }) => void;
};

export const CheckoutModal: React.FC<Props> = ({
  isOpen,
  totalSum,
  itemCount,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [finalOrder, setFinalOrder] = useState({ count: 0, total: 0 });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', address: '', phone: '' };

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
      isValid = false;
    }

    if (formData.address.trim().length < 5) {
      newErrors.address = 'Please enter a complete shipping address';
      isValid = false;
    }

    const phoneRegex = /^\+?[\d\s\-()]{9,20}$/;

    if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleOrderSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (validateForm()) {
      setFinalOrder({ count: itemCount, total: totalSum });
      onSubmit(formData);
      setIsSuccess(true);
    }
  };

  const onCloseModal = () => {
    setIsSuccess(false);
    onClose();
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

        <Dialog.Content className="fixed left-1/2 top-1/2 z-51 flex max-h-[90vh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-6 overflow-y-auto rounded-2xl border border-elements bg-white p-6 shadow-2xl transition-colors dark:border-surface-2-dark dark:bg-surface-1-dark">
          <Dialog.Description className="sr-only">
            {isSuccess
              ? 'Your order has been confirmed.'
              : 'Enter your shipping details to place the order.'}
          </Dialog.Description>

          {!isSuccess ? (
            <>
              <div className="flex flex-col gap-1">
                <Dialog.Title asChild>
                  <h2 className="text-xl font-bold text-primary dark:text-white">
                    Complete Your Order
                  </h2>
                </Dialog.Title>

                <Typography level="small" className="text-secondary">
                  Total items: {itemCount} | Total price:{' '}
                  <span className="font-semibold text-primary dark:text-white">
                    ${totalSum}
                  </span>
                </Typography>
              </div>

              <form
                onSubmit={handleOrderSubmit}
                className="flex flex-col gap-4"
              >
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Green"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  error={errors.name}
                />

                <Input
                  label="Shipping Address"
                  type="text"
                  placeholder="123 Square, NY City"
                  value={formData.address}
                  onChange={e =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  error={errors.address}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+380 (95) 000-0000"
                  value={formData.phone}
                  onChange={e =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  error={errors.phone}
                />

                <div className="mt-2 flex justify-end gap-3">
                  <ButtonSelect
                    handleClick={onCloseModal}
                    isSelected={false}
                    content="Cancel"
                    className="px-4 py-2 border border-elements text-secondary transition-all hover-zoom-small dark:border-secondary dark:hover:bg-surface-2-dark"
                  />

                  <ButtonSelect
                    isSelected={false}
                    handleClick={() => handleOrderSubmit()}
                    content="Place Order"
                    className="px-4 py-2 bg-primary text-sm text-white transition-all hover-zoom-small dark:bg-accent-dark dark:hover:bg-accent-hover-dark"
                  />
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-4 text-center">
              <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-green/20 text-green">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div className="flex flex-col gap-1.5">
                <Dialog.Title asChild>
                  <h2 className="text-2xl font-bold text-primary dark:text-white">
                    Order Confirmed!
                  </h2>
                </Dialog.Title>

                <Typography level="body" className="text-sm text-secondary">
                  Thank you,{' '}
                  <span className="font-semibold text-primary dark:text-white">
                    {formData.name}
                  </span>
                  . <br />
                  Your order for {finalOrder.count} item(s) totaling{' '}
                  <span className="font-semibold text-primary dark:text-white">
                    ${finalOrder.total}
                  </span>{' '}
                  has been placed.
                </Typography>
              </div>

              <ButtonSelect
                isSelected={true}
                handleClick={onCloseModal}
                content="Close"
                className="mt-4 px-8 py-2 bg-primary text-sm text-white transition-all hover-zoom-small dark:bg-accent-dark dark:hover:bg-accent-hover-dark"
              />
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
