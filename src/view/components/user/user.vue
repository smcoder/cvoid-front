<template>
    <div>
        <Card>
            <Button type="success" long @click="addUser">新增</Button>
            <tables ref="tables" searchable search-place="top" v-model="tableData" :columns="columns"/>
            <Page :total="totalNum" show-total/>
        </Card>

        <Modal
            v-model="deleteModal"
            title="确认"
            @on-ok="deleteOk"
            @on-cancel="deleteCancel">
            <p>是否删除当前用户？</p>
        </Modal>


        <Modal
            v-model="operateModal"
            :title="titleName">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="姓名">
                    <Input v-model="formValidate.name" placeholder="请输入您的姓名"></Input>
                </FormItem>
                <FormItem label="账号" prop="account">
                    <Input v-model="formValidate.account" placeholder="请输入您的账号"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input type="password" v-model="formValidate.password" placeholder="请输入您的密码"></Input>
                </FormItem>
                <FormItem label="手机号码">
                    <Input v-model="formValidate.phone" placeholder="请输入您的手机号码"></Input>
                </FormItem>
                <FormItem label="所属省份">
                    <Select v-model="formValidate.addressId" clearable style="width:200px">
                        <Option v-for="item in provinceList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="角色">
                    <RadioGroup v-model="formValidate.role">
                        <Radio label="1" value="1">超级管理员</Radio>
                        <Radio label="2" value="2">普通用户</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="handleReset">取消</Button>
                <Button type="primary" @click="handleSubmit">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Tables from '_c/tables'
import { getUserTableData, deleteUserData, addUserData, editUserData } from '@/api/data'

export default {
    name: 'tables_page',
    components: {
        Tables
    },
    data () {
        return {
            columns: [
                { title: '账号', key: 'account' },
                { title: '用户名', key: 'name' },
                { title: '密码', key: 'password' },
                {
                    title: '角色', key: 'role',
                    render: (h, params) => {
                        let roleName = '普通用户'
                        if (params.row.role === 1) {
                            roleName = '超级管理员'
                        }

                        return h('div', {
                            props: {},
                        }, roleName)
                    }
                },
                { title: '电话号码', key: 'phone' },
                { title: '所属省份', key: 'addressId' },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.editUser(params.row)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.delete(params.row)
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            tableData: [],
            totalNum: 0,
            page_no: 1,
            page_size: 10,
            deleteModal: false,
            operateUserId: null,
            // 新增编辑
            operateModal: false,
            formValidate: {
                name: '',
                account: '',
                password: '',
                phone: '',
                addressId: '',
                role: "1",
            },
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
    methods: {
        delete (params) {
            this.operateUserId = params.id
            this.deleteModal = true
        },
        load () {
            let pageNo = this.page_no
            let pageSize = this.page_size
            getUserTableData({ pageNo, pageSize }).then(res => {
                let data = res.data.data;
                this.tableData = data.rows
                this.totalNum = data.total
            })
        },
        deleteOk () {
            let userId = this.operateUserId
            deleteUserData({ userId }).then(res => {
                this.$Message.success('成功删除用户!')
                this.load()
            })
        },
        deleteCancel () {
            this.deleteModal = false
        },
        changeDate (event) {
        },
        handleSubmit () {
            this.$refs['formValidate'].validate((valid) => {
                if (valid) {
                    let form = this.formValidate
                    if (this.titleName == '编辑用户') {
                        editUserData({ form }).then(res => {
                            if (res.data.code == '2') {
                                this.$Message.error(res.data.msg)
                                return
                            } else {
                                this.$Message.success('数据提交成功！')
                                this.handleReset()
                                this.load()
                            }
                        })
                    } else {
                        addUserData({ form }).then(res => {
                            if (res.data.code == '2') {
                                this.$Message.error(res.data.msg)
                                return
                            } else {
                                this.$Message.success('数据提交成功！')
                                this.handleReset()
                                this.load()
                            }
                        })
                    }
                } else {
                    this.$Message.error('当前存在必填项未输入!')
                    return
                }
            })
        },
        handleReset () {
            this.formValidate.id = null
            this.formValidate.name = ''
            this.formValidate.account = ''
            this.formValidate.password = ''
            this.formValidate.phone = ''
            this.formValidate.addressId = ''
            this.formValidate.role = null
            this.operateModal = false
        },
        addUser () {
            this.titleName = '新增用户'
            this.handleReset()
            this.operateModal = true
        },
        editUser (data) {
            this.handleReset()
            this.titleName = '编辑用户'
            this.formValidate.id = data.id
            this.formValidate.name = data.name
            this.formValidate.account = data.account
            this.formValidate.password = data.password
            this.formValidate.phone = data.phone
            this.formValidate.addressId = data.addressId + ''
            this.formValidate.role = data.role + ''
            this.operateModal = true
        },
        initFormatter () {
            Date.prototype.Format = function (fmt) { //
                let month = this.getMonth() + 1
                month = month < 10 ? '0' + month : month
                let date = this.getDate()
                date = date < 10 ? '0' + date : date
                let hours = this.getHours()
                hours = hours < 10 ? '0' + hours : hours
                let minutes = this.getMinutes()
                minutes = minutes < 10 ? '0' + minutes : minutes
                let seconds = this.getSeconds()
                seconds = seconds < 10 ? '0' + seconds : seconds
                fmt = this.getFullYear() + '-' + month + '-' + date + ' ' + hours + ':' +
                    minutes + ':' + seconds
                return fmt
            }
        },
    },
    mounted () {
        this.load()
    },
    created () {
        this.initFormatter()
    }
}
</script>

<style>

</style>
