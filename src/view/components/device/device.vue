<template>
    <div>
        <Card>
            <Button type="success" long @click="addDevice">新增</Button>
            <tables ref="tables" searchable search-place="top" v-model="tableData" :columns="columns"/>
            <Page :total="totalNum" show-total/>
        </Card>

        <Modal
            v-model="deleteModal"
            title="确认"
            @on-ok="deleteOk"
            @on-cancel="deleteCancel">
            <p>是否删除当前设备？</p>
        </Modal>


        <Modal
            v-model="operateModal"
            :title="titleName">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="设备名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入设备名称"></Input>
                </FormItem>
                <FormItem label="总数量" prop="total_num">
                    <Input v-model="formValidate.total_num" placeholder="请输入总数量"></Input>
                </FormItem>
                <FormItem label="用途">
                    <Input v-model="formValidate.use_content"
                           type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入用途"></Input>
                </FormItem>
                <FormItem label="使用说明">
                    <Input v-model="formValidate.attention_content"
                           type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入使用注意事项"></Input>
                </FormItem>
                <FormItem label="设备图片">
                    <Upload multiple
                            :on-success="handleSuccess"
                            action="http://localhost:8000/upload">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击上传图片</p>
                        </div>
                    </Upload>
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
import { getDeviceTableData, deleteDeviceData, addDeviceData, editDeviceData } from '@/api/data'

export default {
    name: 'tables_page',
    components: {
        Tables
    },
    data () {
        return {
            columns: [
                { title: '设备名称', key: 'name' },
                { title: '总数量', key: 'total_num' },
                { title: '剩余数量', key: 'remain_num' },
                {
                    title: '图片地址', key: 'picture',
                    render: (h, params) => {
                        let value = params.row.picture;

                        if (null == value || '' == value || undefined == value) {
                            return '暂无图片'
                        }

                        let array = [];
                        let valueArray = value.split(",");
                        valueArray.forEach(value => {
                            let _img = 'http://localhost:8000/static/' + value
                            let kk = h('img', {
                                attrs: {
                                    src: _img,
                                    style: 'width: 80px;height: 80px;'
                                },
                            });
                            array.push(kk);
                        });
                        return h('div', array);
                    }
                },
                { title: '用途', key: 'use_content', ellipsis: true, tooltip: true},
                { title: '使用说明', key: 'attention_content', ellipsis: true, tooltip: true},
                {
                    title: '创建日期', key: 'create_time',
                    render: (h, params) => {
                        return h('div', {
                            props: {},
                        }, new Date(params.row.create_time).Format('yyyy-mm-dd hh:mm:ss'))
                    }
                },
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
                                        this.editDevice(params.row)
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
            operateId: null,
            titleName: '',
            // 新增编辑
            operateModal: false,
            formValidate: {
                name: '',
                picture: '',
                total_num: null,
                remain_num: null,
                use_content: '',
                attention_content: '',
                create_time: null
            },
            ruleValidate: {
                name: [
                    { required: true, message: '设备名称不能为空', trigger: 'blur' }
                ],
                total_num: [
                    { required: true, message: '总数量不能为空', trigger: 'blur' }
                ],
                picture: [
                    { required: true, message: '图片不能为空', trigger: 'blur' }
                ],

            }
        }
    },
    methods: {
        delete (params) {
            this.operateId = params.id
            this.deleteModal = true
        },
        load () {
            let page_no = this.page_no
            let page_size = this.page_size
            getDeviceTableData({ page_no, page_size }).then(res => {
                this.tableData = res.data.data
                this.totalNum = res.data.count
            })
        },
        deleteOk () {
            let deviceId = this.operateId
            deleteDeviceData({ deviceId }).then(res => {
                this.$Message.success('成功删除设备!')
                this.load()
            })
        },
        handleSuccess(res, file) {
            let value = this.formValidate.picture;
            if (null == value || '' == value || undefined == value) {
                this.formValidate.picture = res.data;
            } else {
                this.formValidate.picture += "," + res.data;
            }
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
                    if (this.titleName == '编辑消防设备') {
                        editDeviceData({ form }).then(res => {
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
                        addDeviceData({ form }).then(res => {
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
            this.formValidate.name = null
            this.formValidate.picture = null
            this.formValidate.total_num = null
            this.formValidate.remain_num = null
            this.formValidate.use_content = null
            this.formValidate.attention_content = null
            this.operateModal = false
        },
        addDevice () {
            this.titleName = '新增消防设备'
            this.handleReset()
            this.operateModal = true
        },
        editDevice (data) {
            this.handleReset()
            this.titleName = '编辑消防设备'
            this.formValidate.id = data.id
            this.formValidate.name = data.name
            this.formValidate.total_num = data.total_num
            this.formValidate.remain_num = data.remain_num
            this.formValidate.use_content = data.use_content
            this.formValidate.attention_content = data.attention_content
            this.formValidate.picture = data.picture
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
