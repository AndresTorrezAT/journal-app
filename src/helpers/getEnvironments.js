

export const getEnvironments = () => {

    import.meta.env; // para mostrar variables de entorno en front end
    return {
        ...import.meta.env  
    }
}