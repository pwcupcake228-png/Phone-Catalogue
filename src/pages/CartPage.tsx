import { CartItem } from '../components/molecules/CartItem';
import { Typography } from '../components/atoms/Typography/Typography';
import { Checkout } from '../components/molecules/Checkout/Checkout';
import { useAppState, useAppActions } from '../store/store';
import { ButtonBack } from '../components/atoms/Buttons/ButtonBack';
import { useState } from 'react';
import { CheckoutModal } from '../components/molecules/CheckoutModal/CheckoutModal';
import { getDisplayPrice } from '../utils/productPrice';
import { publicAsset } from '../utils/publicAsset';

export const CartPage: React.FC = () => {
  const cartMap = useAppState(state => state.cart);
  const localCart = [...cartMap.values()];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    addItemToCart,
    removeItemFromCart,
    decreaseAmountFromCart,
    clearCart,
  } = useAppActions();

  const cartTotal = Object.values(localCart).reduce((total, item) => {
    const currentItemPrice = getDisplayPrice(item.product).currentPrice;

    const priceOfMany = currentItemPrice * item.amountAdded;

    return priceOfMany + total;
  }, 0);

  const cartCount = Object.values(localCart).reduce(
    (count, item) => item.amountAdded + count,
    0,
  );

  const handleOrderSubmit = () => {
    clearCart();
  };

  return (
    <>
      <main
        className="
          grid
          grid-cols-4 px-4 gap-x-4
          max-w-300 mx-auto
          md:grid-cols-12 md:px-6 md:gap-x-4
          lg:grid-cols-24 lg:px-8 lg:gap-x-6
        "
      >
        <section className="col-span-full grid grid-cols-subgrid">
          <span className="col-span-1 flex items-center w-max my-6 md:mt-10 md:mb-4">
            <ButtonBack />
          </span>

          <Typography level="h1" className="col-span-full mb-8">
            Cart
          </Typography>

          {Object.values(localCart).length === 0 ? (
            <div
              className="
                w-full flex justify-center items-center relative
                col-span-4 mb-14
                md:col-span-12 md:mb-16
                lg:col-span-24 lg:mb-20
              "
            >
              <div>
                <Typography level="h2" className="text-center">
                  Oops! <br /> You have not added anything to your cart yet.
                </Typography>
                <img
                  src={publicAsset('/img/easter-egg.png')}
                  className="
                    absolute rotate-12
                    w-10 bottom-15 right-16
                    min-[503px]:max-[640px]:bottom-7
                    md:bottom-8 md:left-32 md:right-auto
                    md:max-[717px]:-bottom-5
                    lg:w-20 lg:top-0 lg:right-36 lg:left-auto lg:bottom-auto
                  "
                />
              </div>
            </div>
          ) : (
            <>
              <div
                className="
                  w-full flex flex-col gap-4
                  col-span-4
                  md:col-span-12
                  lg:col-span-16 lg:mb-20
                "
              >
                {Object.values(localCart).map(item => (
                  <CartItem
                    key={item.product.id}
                    image={item.product.images[0]}
                    title={item.product.name}
                    price={
                      getDisplayPrice(item.product).currentPrice *
                      item.amountAdded
                    }
                    quantity={item.amountAdded}
                    productPath={`/${item.product.category}/${item.product.id}`}
                    onRemove={() => removeItemFromCart(item.product.id)}
                    onQuantityChange={newQuantity => {
                      if (newQuantity > item.amountAdded) {
                        addItemToCart(item.product);
                      } else if (newQuantity < item.amountAdded) {
                        decreaseAmountFromCart(item.product.id);
                      }
                    }}
                  />
                ))}
              </div>

              <div
                className="
                  col-span-4 mt-8 mb-14
                  md:col-span-12 md:mt-8 md:mb-16
                  lg:col-span-8 lg:mt-0 lg:mb-20
                "
              >
                <Checkout
                  sum={cartTotal}
                  amount={cartCount}
                  onCheckout={() => setIsModalOpen(true)}
                />
              </div>
            </>
          )}
        </section>
      </main>
      <CheckoutModal
        isOpen={isModalOpen}
        totalSum={cartTotal}
        itemCount={cartCount}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOrderSubmit}
      />
    </>
  );
};
