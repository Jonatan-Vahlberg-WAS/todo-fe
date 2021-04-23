import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { ContextWrapper } from '../utils/TodoContext'

function MyApp({ Component, pageProps }) {
    return (
        <ContextWrapper>
            <Component {...pageProps} />
        </ContextWrapper>
    )
}

export default MyApp
