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
                    <Select v-model="form.addressId" clearable style="width:200px">
                        <Option v-for="item in provinceList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
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
                addressId: '',
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

            },
            provinceList: [
                {
                    value: '北京',
                    label: '北京'
                },
                {
                    value: '上海',
                    label: '上海'
                },
                {
                    value: '天津',
                    label: '天津'
                },
                {
                    value: '重庆',
                    label: '重庆'
                },
                {
                    value: '内蒙古',
                    label: '内蒙古'
                },
                {
                    value: '广西',
                    label: '广西'
                },
                {
                    value: '西藏',
                    label: '西藏'
                },
                {
                    value: '宁夏',
                    label: '宁夏'
                },
                {
                    value: '新疆',
                    label: '新疆'
                },
                {
                    value: '香港',
                    label: '香港'
                },
                {
                    value: '澳门',
                    label: '澳门'
                },
                {
                    value: '河北',
                    label: '河北'
                },
                {
                    value: '山西',
                    label: '山西'
                },
                {
                    value: '辽宁',
                    label: '辽宁'
                },
                {
                    value: 'jilin',
                    label: '吉林'
                },
                {
                    value: '黑龙江',
                    label: '黑龙江'
                },
                {
                    value: '江苏',
                    label: '江苏'
                },
                {
                    value: '浙江',
                    label: '浙江'
                },
                {
                    value: '安徽',
                    label: '安徽'
                },
                {
                    value: '福建',
                    label: '福建'
                },
                {
                    value: '江西',
                    label: '江西'
                },
                {
                    value: '山东',
                    label: '山东'
                },
                {
                    value: '河南',
                    label: '河南'
                },
                {
                    value: '湖北',
                    label: '湖北'
                },
                {
                    value: '湖南',
                    label: '湖南'
                },
                {
                    value: '广东',
                    label: '广东'
                },
                {
                    value: '海南',
                    label: '海南'
                },
                {
                    value: '四川',
                    label: '四川'
                },
                {
                    value: '贵州',
                    label: '贵州'
                },
                {
                    value: '云南',
                    label: '云南'
                },
                {
                    value: '陕西',
                    label: '陕西'
                },
                {
                    value: '甘肃',
                    label: '甘肃'
                },
                {
                    value: '青海',
                    label: '青海'
                },
                {
                    value: '台湾',
                    label: '台湾'
                }
            ],
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
            this.form.addressId = ''
            this.form.phone = ''
        },
        handleReset () {
            this.registerModal = false
            this.form.name = ''
            this.form.account = ''
            this.form.password = ''
            this.form.role = ''
            this.form.addressId = ''
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
                        addressId: this.form.addressId,
                        name: this.form.name
                    })
                }
            })
        }
    }
}
</script>
