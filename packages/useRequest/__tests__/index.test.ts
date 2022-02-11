import { shallowMount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';
import MockDate from 'mockdate';
import { sleep } from '../../utils/testingHelpers';
import useRequest from '../index';
import { Service, BaseOptions, Result } from '../types'

describe('useRequest', () => {
  const originalError = console.error;
  const originalWarn = console.warn;
  const requestDelayTime = 500;

  beforeAll(() => {
    console.error = (...args) => {
      if (/Vue warn/.test(args[0])) {
        return;
      }
      originalError.call(console, ...args);
    };
    console.warn = (...args) => {
      if (/Vue warn/.test(args[0])) {
        return;
      }
      originalWarn.call(console, ...args);
    };
  });
  afterAll(() => {
    console.error = originalError;
    console.warn = originalWarn;
  });

  const request: Service = (req:any) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (req === 0) {
          reject(new Error('fail'));
        } else {
          resolve('success');
        }
      }, requestDelayTime);
    });

  it('should be defined', () => {
    expect(useRequest).toBeDefined();
  });

  const setUp = (service:Service, options?:BaseOptions) => useRequest(service, options);

  let hook:Result<any>;
  it('useRequest should auto run', async () => {
    let successValue:string = '';
    const successCallback = (text:string) => {
      successValue = text;
    };
    const errorCallback = jest.fn();

    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(request, {
            onSuccess: successCallback,
            onError: errorCallback,
          });
        },
      }),
    );
    expect(hook.loading.value).toEqual(true);
    await sleep(requestDelayTime);
    expect(hook.loading.value).toEqual(false);
    expect(hook.data.value).toEqual('success');
    expect(successValue).toEqual('success');
    expect(errorCallback).not.toHaveBeenCalled();

    hook.run(0);
    expect(hook.loading.value).toEqual(true);
    await sleep(requestDelayTime);
    expect(hook.error.value).toEqual(new Error('fail'));
    expect(hook.loading.value).toEqual(false);
    expect(errorCallback).toHaveBeenCalled();

    hook.run(1);
    await sleep(requestDelayTime);
    expect(hook.data.value).toEqual('success');
    expect(hook.loading.value).toEqual(false);
    expect(errorCallback).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('useRequest should be manually triggered', async () => {
    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(request, {
            manual: true,
          });
        },
      }),
    );
    expect(hook.loading.value).toEqual(false);
    hook.run(1);
    expect(hook.loading.value).toEqual(true);
    await sleep(requestDelayTime);
    expect(hook.loading.value).toEqual(false);
    expect(hook.data.value).toEqual('success');
    wrapper.unmount();
  });

  it('useRequest polling should work', async () => {
    const callback = jest.fn();
    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(
            () => {
              callback();
              return request();
            },
            {
              pollingInterval: 100,
              pollingWhenHidden: true,
            },
          );
        },
      }),
    );
    expect(hook.loading.value).toEqual(true);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    await sleep(100);
    expect(callback).toHaveBeenCalledTimes(2);
    await sleep(100);
    expect(callback).toHaveBeenCalledTimes(3);
    hook.cancel();
    expect(callback).toHaveBeenCalledTimes(3);

    hook.run();
    expect(callback).toHaveBeenCalledTimes(4);
    wrapper.unmount();
  });

  it('useRequest debounceInterval should work', async () => {
    const callback = jest.fn();

    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(
            () => {
              callback();
              return request();
            },
            {
              manual: true,
              debounceInterval: 100,
            },
          );
        },
      }),
    );

    hook.run(1);
    hook.run(2);
    hook.run(3);
    hook.run(4);
    await sleep(100);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);

    hook.run(1);
    hook.run(2);
    hook.run(3);
    hook.run(4);
    await sleep(100);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(2);

    wrapper.unmount();
  });

  it('useRequest throttleInterval should work', async () => {
    const callback = jest.fn();

    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(
            () => {
              callback();
              return request();
            },
            {
              manual: true,
              throttleInterval: 100,
            },
          );
        },
      }),
    );
    await sleep(100);
    hook.run(1);
    hook.run(2);
    await sleep(100);
    hook.run(3);
    hook.run(4);

    expect(callback).toHaveBeenCalledTimes(2);

    wrapper.unmount();
  });

  it('useRequest mutate should work', async () => {
    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(request);
        },
      }),
    );
    await sleep(requestDelayTime);
    expect(hook.data.value).toEqual('success');
    hook.mutate('hello');
    expect(hook.data.value).toEqual('hello');
    wrapper.unmount();
  });

  it('useRequest loadingDelay should work', async () => {
    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(request, {
            loadingDelay: 2000,
          });
        },
      }),
    );
    expect(hook.loading.value).toEqual(false);
    await sleep(1000);
    expect(hook.loading.value).toEqual(false);
    wrapper.unmount();
  });

  it('useRequest loadingDelay should delay', async () => {
    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(request, {
            loadingDelay: 300,
          });
        },
      }),
    );
    expect(hook.loading.value).toEqual(false);
    await sleep(requestDelayTime);
    expect(hook.loading.value).toEqual(false);
    wrapper.unmount();
  });

  it('useRequest refreshDeps should work', async () => {
    const refreshValue = ref(1);
    const callback = jest.fn();
    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(
            () => {
              callback();
              return request();
            },
            {
              refreshDeps: [refreshValue],
            },
          );
        },
      }),
    );
    expect(hook.loading.value).toEqual(true);
    expect(callback).toHaveBeenCalledTimes(1);
    await sleep(requestDelayTime);
    expect(hook.loading.value).toEqual(false);

    refreshValue.value = 2;
    await sleep(0);
    expect(hook.loading.value).toEqual(true);
    expect(callback).toHaveBeenCalledTimes(2);
    await sleep(requestDelayTime);
    expect(hook.loading.value).toEqual(false);
    wrapper.unmount();
  });

  it('useRequest ready should work', async () => {
    const ready = ref(false);
    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(request, {
            ready,
          });
        },
      }),
    );
    expect(hook.loading.value).toEqual(false);
    ready.value = true;
    await sleep(0);
    expect(hook.loading.value).toEqual(true);
    wrapper.unmount();
  });

  it('useRequest initialData should work', async () => {
    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(request, {
            initialData: 'hello',
          });
        },
      }),
    );
    expect(hook.loading.value).toEqual(true);
    expect(hook.data.value).toEqual('hello');
    await sleep(requestDelayTime);
    expect(hook.data.value).toEqual('success');
    wrapper.unmount();
  });

  it('useRequest formatResult should work', async () => {
    let formarParams = '';
    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(request, {
            formatResult: p => {
              formarParams = p;
              return 'hello';
            },
          });
        },
      }),
    );
    expect(hook.loading.value).toEqual(true);
    await sleep(requestDelayTime);
    expect(hook.loading.value).toEqual(false);
    expect(formarParams).toEqual('success');
    expect(hook.data.value).toEqual('hello');
    wrapper.unmount();
  });

  it('useRequest defaultParams should work', async () => {
    const defaultParamsRequest = (...req:any[]) =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(req);
        }, 500);
      });
    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(defaultParamsRequest, {
            defaultParams: [1, 2, 3],
          });
        },
      }),
    );
    expect(hook.loading.value).toEqual(true);
    await sleep(requestDelayTime);
    expect(hook.data.value).toEqual([1, 2, 3]);
    wrapper.unmount();
  });

  it('useRequest throwOnError to be false should work', async () => {
    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(request, {
            manual: true,
          });
        },
      }),
    );
    hook.run(0);
    await sleep(requestDelayTime);
    expect(hook.data.value).toEqual(undefined);
    expect(hook.error.value).toEqual(new Error('fail'));
    wrapper.unmount();
  });

  it('useRequest cacheKey should work', async () => {
    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(request, {
            cacheKey: 'testCacheKey',
          });
        },
      }),
    );
    await sleep(requestDelayTime);
    expect(hook.loading.value).toEqual(false);
    expect(hook.data.value).toEqual('success');
    wrapper.unmount();

    let hook2:any;
    const wrapper2 = shallowMount(
      defineComponent({
        setup() {
          hook2 = setUp(request, {
            cacheKey: 'testCacheKey',
          });
        },
      }),
    );
    expect(hook2.data.value).toEqual('success');
    await sleep(requestDelayTime);
    expect(hook2.loading.value).toEqual(false);
    wrapper2.unmount();
  });

  it('useRequest staleTime should work', async () => {
    MockDate.set(0);
    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(request, {
            cacheKey: 'testStaleTime',
            staleTime: 3000,
          });
        },
      }),
    );
    expect(hook.loading.value).toEqual(true);
    await sleep(requestDelayTime);
    expect(hook.loading.value).toEqual(false);
    expect(hook.data.value).toEqual('success');
    wrapper.unmount();
    MockDate.set(1000);

    let hook2:any;
    const wrapper2 = shallowMount(
      defineComponent({
        setup() {
          hook2 = setUp(request, {
            cacheKey: 'testStaleTime',
            staleTime: 3000,
          });
        },
      }),
    );
    expect(hook.loading.value).toEqual(false);
    expect(hook2.data.value).toEqual('success');
    wrapper2.unmount();

    MockDate.set(3001);
    let hook3:any;
    const wrapper3 = shallowMount(
      defineComponent({
        setup() {
          hook3 = setUp(request, {
            cacheKey: 'testStaleTime',
            staleTime: 3000,
          });
        },
      }),
    );
    expect(hook3.data.value).toEqual('success');
    await sleep(requestDelayTime);
    expect(hook3.loading.value).toEqual(false);
    wrapper3.unmount();
  });

  it('useRequest cacheTime should work', async () => {
    MockDate.set(0);
    const wrapper = shallowMount(
      defineComponent({
        setup() {
          hook = setUp(request, {
            cacheKey: 'testCacheTime',
            cacheTime: 2000,
          });
        },
      }),
    );
    expect(hook.loading.value).toEqual(true);
    await sleep(requestDelayTime);
    expect(hook.loading.value).toEqual(false);
    expect(hook.data.value).toEqual('success');
    wrapper.unmount();
    MockDate.set(500);
    await sleep(500);

    let hook2:any;
    const wrapper2 = shallowMount(
      defineComponent({
        setup() {
          hook2 = setUp(request, {
            cacheKey: 'testCacheTime',
            cacheTime: 2000,
          });
        },
      }),
    );
    expect(hook2.data.value).toEqual('success');
    wrapper2.unmount();
    MockDate.set(3001);
    await sleep(3001);

    let hook3:any;
    const wrapper3 = shallowMount(
      defineComponent({
        setup() {
          hook3 = setUp(request, {
            cacheKey: 'testCacheTime',
            cacheTime: 2000,
          });
        },
      }),
    );
    expect(hook3.data.value).toEqual(undefined);
    await sleep(requestDelayTime);
    expect(hook3.loading.value).toEqual(false);
    expect(hook3.data.value).toEqual('success');
    wrapper3.unmount();
  });
});
