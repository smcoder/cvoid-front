<template>
    <div>
        <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
            <FormItem prop="account">
                <Input v-model="form.account" placeholder="请输入账号">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
                </Input>
            </FormItem>
            <FormItem>
                <Button @click="handleSubmit" type="primary" long>登录</Button>
                <Button @click="register" type="primary" long>注册</Button>
            </FormItem>
        </Form>

        <Modal
            v-model="registerModal"
            title="用户注册">
            <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="80">
                <FormItem label="姓名">
                    <Input v-model="form.name" placeholder="请输入您的姓名"></Input>
                </FormItem>
                <FormItem label="账号" prop="account">
                    <Input v-model="form.account" placeholder="请输入您的账号"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input type="password" v-model="form.password" placeholder="请输入您的密码"></Input>
                </FormItem>
                <FormItem label="手机号码">
                    <Input v-model="form.phone" placeholder="请输入您的手机号码"></Input>
                </FormItem>
                <FormItem label="省份">
                    <Input v-model="form.address_id" placeholder="请输入所在省份"></Input>
                </FormItem>
                <FormItem label="角色">
                    <RadioGroup v-model="form.role">
                        <Radio label="1" value="1">超级管理员</Radio>
                        <Radio label="2" value="2">普通用户</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="handleReset">取消</Button>
                <Button type="primary" @click="registerSubmit">提交</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    name: 'LoginForm',
    props: {
        accountRules: {
            type: Array,
            default: () => {
                return [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ]
            }
        },
        passwordRules: {
            type: Array,
            default: () => {
                return [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    data () {
        return {
            form: {
                account: 'admin',
                password: '',
                name: '',
                phone: '',
                address_id: '',
                role: ''
            },
            registerModal: false,
            ruleValidate: {
                account: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],

            }
        }
    },
    computed: {
        rules () {
            return {
                account: this.accountRules,
                password: this.passwordRules
            }
        }
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.$emit('on-success-valid', {
                        account: this.form.account,
                        password: this.form.password
                    })
                }
            })
        },
        register () {
            this.registerModal = true
            this.form.name = ''
            this.form.account = ''
            this.form.password = ''
            this.form.role = ''
            this.form.address_id = ''
            this.form.phone = ''
        },
        handleReset () {
            this.registerModal = false
            this.form.name = ''
            this.form.account = ''
            this.form.password = ''
            this.form.role = ''
            this.form.address_id = ''
            this.form.phone = ''
        },
        registerSubmit () {
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    this.$emit('on-success-register', {
                        account: this.form.account,
                        password: this.form.password,
                        role: this.form.role,
                        phone: this.form.phone,
                        address_id: this.form.address_id,
                        name: this.form.name
                    })
                }
            })
        }
    }
}
</script>
