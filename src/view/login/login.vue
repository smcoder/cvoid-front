<style lang="less">
@import './login.less';
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="handleSubmit"
                                @on-success-register="registerSubmit"></login-form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'

export default {
    components: {
        LoginForm
    },
    methods: {
        ...mapActions([
            'handleLogin',
            'getUserInfo',
            'handleRegister'
        ]),
        handleSubmit ({ account, password }) {
            this.handleLogin({ account, password }).then(res => {
                if (res.data.code == '-1') {
                    this.$Message.error('当前用户不存在或账号密码错误！')
                    return
                }
                this.getUserInfo().then(res => {
                    this.$router.push({
                        name: this.$config.homeName
                    })
                })
            })
        },
        registerSubmit({account, password, role, phone, address_id, name}) {
            this.handleRegister({account, password, role, phone, address_id, name}).then(res => {
                if (res.data.code == '-1') {
                    this.$Message.error(res.data);
                    return;
                } else {
                    this.$Message.success("注册成功，请登录");
                }
            })
        }
    }
}
</script>

<style>

</style>
