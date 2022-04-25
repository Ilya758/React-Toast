# React-Toast-Lib

## Welcome to your personal bubbling notifications!

### The link to npm-package

```
https://www.npmjs.com/package/react-toast-lib
```

---

### To run a dev-server type

```
npm start
```

---

### To see a Toast-component in isolation, type

```
npm run storybook
```

### and customize for your needs!

---

### To run a test, type and choose the first corresponding test

```
npm run cypress:open
```

---

### Example of usage

1. Extract utility method **initializeToastify** from the lib
2. Call this method and destruct toast-generating methods
3. Extract ToastContainer-component to create a list of toasts
4. If you want, write your custom method to create a toast (in this example it's a method _notify_)
5. Once you created this function, call it wherever you want with additional config

```tsx
// example in App.tsx
import { initializeToastify, ToastContainer } from 'react-toast-lib';

const { generateToast } = initializeToastify(); // it creates an instance of ToastService

const App = () => {
  const notify = () =>
    generateToast({
      animationType: 'flip',
      lifetime: 3000,
      content: 'Test toast',
      position: {
        right: '1rem',
        top: '0.5rem',
      },
    });

  return (
    <>
      <button onClick={notify}>Notify</button>

      <ToastContainer />
    </>
  );
};

export default App;
```

---

### List of toast-generating methods:

- generateToast() - generate custom toast
- generateSuccessfulToast() - generate success toast
- generateErrorToast() - generate error toast
- generateInfoToast() - generate info toast
- generateWarnToast() - generate warning toast

---

### List of toast settings:

- animationType: flip/rotate/zoom/fill - set an animation of appear/disappear toast-state
- position: top/right/bottom/left - set a position of a toast
- content: string - set custom text filling
- lifetime: number - restrains a time of existence of a toast
- type: success/error/warn/info - set a type of a toast
- backColor: string - set a background color
- icon: URI-path/picture module - set an icon of a toast

---
