import { onScopeDispose, onUnmounted, version } from 'vue';

const useUnmount = (fn:any) => {
  const unmounted = onScopeDispose ?? onUnmounted;
  unmounted(() => {
    fn();
  });
};

export default useUnmount;
