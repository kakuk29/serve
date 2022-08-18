<template>
    <header>
        <h1>{{ title }}</h1>
    </header>
    <main>
        <form action="post">
            <input type="text" name="mail" placeholder="mail" /><br>
            <input type="password" name="password" placeholder="password" /><br>
            <input type="submit" value="submit" />
        </form>
    </main>
</template>

<script>
export default {
    // eslint-disable-next-line
    name: "login",
    data() {
        return {
            title: "connection",
        };
    },
    methods: {
        login() {
            fetch("localhost:8080/user/login")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
        },
    },
};
</script>