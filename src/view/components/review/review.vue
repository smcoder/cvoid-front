<template>
    <div>
        <Card>
            <tables ref="tables" searchable search-place="top" v-model="tableData" :columns="columns"/>
            <Page :total="totalNum" show-total/>
        </Card>


        <Modal
            v-model="operateModal"
            title="审核">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="意见" prop="review_remark">
                    <Input v-model="formValidate.review_remark"
                           type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入意见"></Input>
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
import { getReviewTableData, editReviewData } from '@/api/data'

export default {
    name: 'tables_page',
    components: {
        Tables
    },
    data () {
        return {
            columns: [
                { title: '住户姓名', key: 'use_name' },
                {
                    title: '图片', key: 'picture',
                    render: (h, params) => {
                        let value = params.row.picture

                        if (null == value || '' == value || undefined == value) {
                            return '暂无图片'
                        }

                        let array = []
                        let valueArray = value.split(',')
                        valueArray.forEach(value => {
                            let _img = 'http://localhost:8000/static/' + value
                            let kk = h('img', {
                                attrs: {
                                    src: _img,
                                    style: 'width: 80px;height: 80px;'
                                },
                            })
                            array.push(kk)
                        })
                        return h('div', array)
                    }
                },
                { title: '上报备注', key: 'remark',  ellipsis: true, tooltip: true},
                {
                    title: '审核状态', key: 'status',
                    render: (h, params) => {
                        let value = params.row.status
                        if (value == 0) {
                            return h('span', {}, '未审核')
                        }
                        return h('span', {}, '已审核')
                    }
                },
                { title: '审核建议', key: 'review_remark', ellipsis: true, tooltip: true},
                {
                    title: '审核日期', key: 'create_time',
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
                                        this.editReview(params.row)
                                    }
                                }
                            }, '审核')
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
            // 新增编辑
            operateModal: false,
            formValidate: {
                review_remark: null,
            },
            ruleValidate: {
                review_remark: [
                    { required: true, message: '审核意见不能为空', trigger: 'blur' }
                ]
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
            getReviewTableData({ page_no, page_size }).then(res => {
                this.tableData = res.data.data
                this.totalNum = res.data.count
            })
        },
        changeDate (event) {

        },
        handleSubmit () {
            this.$refs['formValidate'].validate((valid) => {
                if (valid) {
                    let form = this.formValidate
                    form.id = this.operateId
                    editReviewData({ form }).then(res => {
                        if (res.data.code == '2') {
                            this.$Message.error(res.data.msg)
                            return
                        } else {
                            this.$Message.success('审核成功！')
                            this.handleReset()
                            this.load()
                        }
                    })
                } else {
                    this.$Message.error('当前存在必填项未输入!')
                    return
                }
            })
        },
        handleReset () {
            this.formValidate.id = null
            this.formValidate.review_remark = null
            this.operateModal = false
        },
        editReview (param) {
            this.operateId = param.id
            this.handleReset()
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
