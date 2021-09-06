import { Toaster } from 'react-hot-toast';

const Notification = () => (
  <Toaster
    position="bottom-center"
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={{}}
    toastOptions={{
      className: '',
      duration: 2500,
      style: {
        background: '#363636',
        color: '#fff'
      }
    }}
  />
);

export default Notification;