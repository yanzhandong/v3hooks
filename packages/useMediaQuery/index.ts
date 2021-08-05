import { ref, onUnmounted } from 'vue';

const useMediaQuery = (query:string)=>{
    const mediaQuery = window.matchMedia(query);
    const stata = ref<boolean>( mediaQuery.matches );
    
    const handleChange = ( event: MediaQueryListEvent )=> stata.value = event.matches;

    mediaQuery.addEventListener('change',handleChange)

    onUnmounted(()=>{
        mediaQuery.removeEventListener('change',handleChange)
    });

    return stata
};

export default useMediaQuery