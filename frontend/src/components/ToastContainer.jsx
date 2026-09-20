import { useSelector, useDispatch } from 'react-redux';
import Toast from './Toast';
import { removeToast } from '../redux/slices/uiSlice';

const ToastContainer = () => {
  const { toasts } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleRemoveToast = (id) => {
    dispatch(removeToast(id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={handleRemoveToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
