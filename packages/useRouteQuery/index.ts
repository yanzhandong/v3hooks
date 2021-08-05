import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const useRouteQuery = ( key: string)=>{
  
    const route = useRoute();
    const router = useRouter();
    return computed({
        get:()=>{
            return route.query[key];
        },
        set: val => {
            router.replace({ query: { ...route.query ,[key]: val } });
        }
    })
};

export default useRouteQuery