// define la forma del objeto que recibe la funcion.
// el ? significa que las propiedades son opcionales, pueden estar o no
// esto es intencional porque precisamente queremos validar si existen o no
interface EnvVars{
    TELEGRAM_TOKEN?: string;
    TELEGRAM_CHAT_ID?: string;
}

// define la forma del objeto que devuelve la funcion
// aqui no hay ?, si la funcion devuelve eso, es porque ya valido que todo existe
// es la garantia de que quien use AppConfig nunca tendra valor undefined
export interface AppConfig{
    telegramToken: string;
    telegramChatId: string;
}

// recibe un EnvVars (donde todo puede faltar) y devuelve un AppConfig
// (donde todo esta garantizado)
// Esa transformacion es exactamente la validacion
export function validateConfig(env: EnvVars): AppConfig{
    const required = ['TELEGRAM_TOKEN', 'TELEGRAM_CHAT_ID'];

    for(const key of required){
        if(!env[key as keyof EnvVars]){
            throw new Error(`Missing required env var: ${key}`);
        }
    }
    // itera sobre los nombres de las variables requeridas.
    // key as keyof EnvVars, es necesario porque Typescript 
    // no sabe automaticamente que 'TELEGRAM_TOKE' es una clave
    // de la interfaz cuando viene de un array de strings
    return {
        telegramToken: env.TELEGRAM_TOKEN!,
        telegramChatId: env.TELEGRAM_CHAT_ID!
    };
    //si alguna variable no existe o esta vacia, lanza un error 
    // inmediatamente con el nombre exacto de la variable que falta
    // el ! es el non-null assertion operator de Typescript 
    // le dice "se que esto no es undefined, confia en mi"
    //lo podemos usar con seguridad, aqui por el loop de arriba ya garantizo que existen
}