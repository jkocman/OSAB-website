<template>
    <main>
        <RouterLink to="/">
              <img src="../assets/img/logo-without-text.png" alt="Logo" />
        </RouterLink>
        <Article>
            <h1>Register</h1>
            <form action="POST">
                <section>
                    <label>Enter your username</label>
                    <Input :search="false" inputPlaceholder="Username" type="text"></Input>
                </section>
                <section>
                    <label>Enter your email</label>
                    <Input :search="false" inputPlaceholder="Email" type="email"></Input>
                </section>
                <section>
                    <label>Enter your password</label>
                    <Input :search="false" inputPlaceholder="Password" type="password"></Input>
                </section>
                <section>
                    <label>Confirm your password</label>
                    <Input :search="false" inputPlaceholder="Confirm Password" type="password"></Input>
                </section>
                <Button
                    title="Register"
                    :fontSize="22"
                    :paddingHorizontal="35"
                    :paddingVertical="10"
                    buttonType="primary"    
                ></Button>
            </form>
            <p>Already have an account? <a @click="router.push('/login')">Log in</a> instead</p>
        </Article>
    </main>
</template>

<script setup lang="ts">
import router from '@/router';
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