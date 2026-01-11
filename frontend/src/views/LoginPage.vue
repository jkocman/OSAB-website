<template>
    <main>
        <RouterLink to="/">
              <img src="../assets/img/logo-without-text.png" alt="Logo" />
        </RouterLink>
        <Article>
            <h1>Log in</h1>
            <form @submit.prevent="handleClick">
                <section>
                    <label>Enter your username or email</label>
                    <Input :search="false" inputPlaceholder="Username or Email" type="text" v-model="email"></Input>
                </section>
                <section>
                    <label>Enter your password</label>
                    <Input :search="false" inputPlaceholder="Password" type="password" v-model="password"></Input>
                </section>
                <Button
                    title="Log in"
                    :fontSize="22"
                    :paddingHorizontal="35"
                    :paddingVertical="10"
                    buttonType="primary"
                    type="submit"  
                ></Button>
            </form>
            <p>Don't have an account? <a @click="router.push('/register')">Register</a> instead</p>
        </Article>
    </main>
</template>

<script setup lang="ts">
import router from '@/router';
import  { ref } from "vue";
import { login } from '@/composables/api';

const password = ref('');
const email = ref('');

const handleClick = () => {
    login(email.value, password.value);
}

</script>

<style lang="scss" scoped>
    main{
        height: 100vh;
        margin: 0 var(--global-padding);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 30px;

        img {
            width: 100px;
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translate(-50%);
        }

        Article {

            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            padding: 50px;
            max-width: 800px;

            h1 {
                color: white;
                font-weight: 600;
                font-size: var(--large-text-size);
                text-align: center;
            }

            form{
                display: flex;
                flex-direction: column;
                gap: 30px;
                width: 500px;
                text-align: left;
                
                @media(max-width: 627px){
                    width: 100%;
                }

                section {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    label {
                        color: var(--terciary-foreground-color);
                        font-size: var(--small-text-size);
                    }
                }
            }
            p {
                color: var(--terciary-foreground-color);
                font-size: var(--small-text-size);
                text-align: center;

                a {
                    color: var(--secondary-foreground-color);
                    cursor: pointer;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>