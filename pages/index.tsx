import Head from 'next/head'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Formik, Form } from 'formik'
import StyledInput from '../components/StyledInput'
import { useState } from 'react'

const Home: NextPage<{}> = () => {
    const [isLoginMode, setIsLoginMode] = useState<boolean>(true)

    return (
        <Layout>
            <p> {isLoginMode ? 'Log in' : 'Register'}</p>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={(values) => {
                    if (isLoginMode) {
                        return
                    }
                    return
                }}
            >
                {({}) => (
                    <Form>
                        <StyledInput
                            name="email"
                            type="email"
                            placeholder={'Email'}
                        />
                        <StyledInput
                            name="password"
                            type="password"
                            placeholder={'Password'}
                        />
                        <button
                            type="submit"
                            className="px-3 py-2 bg-yellow-200 bg-opacity-80 text-gray-900 rounded-full w-40"
                        >
                            {isLoginMode ? 'Log in' : 'Register'}
                        </button>
                        <p>Or</p>
                        <a
                            href="#"
                            onClick={() => setIsLoginMode(!isLoginMode)}
                            className="underline"
                        >
                            {isLoginMode ? 'Register' : 'Login'}
                        </a>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}
export default Home
