import { reactive, ref, Ref } from 'vue';

export interface OptionType {
    itemHeight: number | ((index: number) => number);
    overscan?: number;
}

const useVirtualList = <T = any>(state: T[], options: OptionType) => {
    let start = 0;
    let end = 10;
    const list = ref(state.slice(start, end)) as Ref<T[]>;

    const { itemHeight, overscan = 5 } = options;
    const containerRef = ref<HTMLElement | null>();


    const totalHeight: number = (() => {
        if (typeof itemHeight === 'number') {
            return state.length * itemHeight;
        }
        return state.reduce((sum, _, index) => sum + itemHeight(index), 0);
    })();

    // 计算当前视图展示数量
    const getViewCapacity = (containerHeight: number) => {
        if (typeof itemHeight === 'number') {
            return Math.ceil(containerHeight / itemHeight);
        }
        let sum = 0;
        let capacity = 0;
        for (let i = start; i < state.length; i++) {
            const height = (itemHeight as (index: number) => number)(i);
            sum += height;
            if (sum >= containerHeight) {
                capacity = i;
                break;
            }
        }
        return capacity - start;
    };

    // 获取当前索引
    const getOffset = (scrollTop: number) => {
        if (typeof itemHeight === 'number') {
            return Math.floor(scrollTop / itemHeight) + 1;
        }
        let sum = 0;
        let offset = 0;
        for (let i = 0; i < state.length; i++) {
            const height = (itemHeight as (index: number) => number)(i);
            sum += height;
            if (sum >= scrollTop) {
                offset = i;
                break;
            }
        }
        return offset + 1;
    };

    // 获取当前索引向上高度
    const getDistanceTop = (index: number) => {
        if (typeof itemHeight === 'number') {
            const height = index * itemHeight;
            return height;
        }
        const height = state.slice(0, index).reduce((sum, _, i) => sum + itemHeight(i), 0);
        return height;
    };

    let offsetTop = getDistanceTop(start);


    // 计算展示指定位置
    const calculateRange = () => {
        const element = containerRef.value;
        if (element) {
            const offset = getOffset(element.scrollTop);
            const viewCapacity = getViewCapacity(element.clientHeight);

            const from = offset - overscan;
            const to = offset + viewCapacity + overscan;
            start = from < 0 ? 0 : from;
            end = to > state.length ? state.length : to;

            list.value = state.slice(start, end);

            // 实时计算
            offsetTop = getDistanceTop(start);
            wrapperStyle.marginTop = offsetTop + 'px';
            wrapperStyle.height = totalHeight - offsetTop + 'px';
        }
    };




    // 滚动容器的外层监听
    const containerProps = reactive({
        ref: (ele: any) => {
            containerRef.value = ele;
        },
        onScroll: (e: any) => {
            e.preventDefault();
            calculateRange()
        },
        style: { overflowY: 'auto' as const },
    });

    // children 外层包裹器 style
    const wrapperStyle = reactive({
        width: '100%',
        height: totalHeight - offsetTop + 'px',
        marginTop: offsetTop + 'px'
    });

    // 快速滚动到指定 index	
    const scrollTo = (index: number) => {
        if (containerRef.value) {
            containerRef.value.scrollTop = getDistanceTop(index);
            calculateRange();
        }
    };

    return {
        list,
        wrapperStyle,
        containerProps,
        scrollTo
    }
};

export default useVirtualList