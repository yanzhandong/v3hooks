import { ref, Ref } from 'vue';

const useDocumentVisibility = (): Ref<boolean> =>{
    const documentVisibility = ref<boolean>( document.hidden );
    let handler = ()=> {
        documentVisibility.value = document.hidden;
    };
    document.addEventListener('visibilitychange',handler );
    return documentVisibility
}

export default useDocumentVisibility