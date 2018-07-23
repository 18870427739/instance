<template>
<div class="loginContainer">
<head-top :head-title="loginWay?'登录':'密码登录'" goBack="true">
welcome to login vue-elm
</head-top>
 <form class="loginForm" v-if="loginWay">
    <section class="input_container phone_number">

    </section>
</form>
</div>
</template>
<script>

</script>
<style>

</style>
