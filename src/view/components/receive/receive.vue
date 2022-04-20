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
            <p>是否删除当前领取记录？</p>
        </Modal>
    </div>
</template>

<script>
import Tables from '_c/tables'
import { getReceiveTableData, deleteReceiveData, editReceiveData } from '@/api/data'

export default {
    name: 'tables_page',
    components: {
        Tables
    },
    data () {
        return {
            columns: [
                { title: '设备名称', key: 'device_name' },
                { title: '领取数量', key: 'receive_num' },
                { title: '用途', key: 'use_content' },
                { title: '注意事项', key: 'attention_content' },
                { title: '领取状态', key: 'status' },
                {
                    title: '领取日期', key: 'create_time',
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
                                        this.handleSubmit(params.row)
                                    }
                                }
                            }, '领取'),
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
            // 新增编辑
            operateModal: false,
            titleName: null,
            formValidate: {
                id: null,
                device_name: null,
                receive_num: null,
                use_content: null,
                attention_content: null,
                create_time: null
            },
            ruleValidate: {}
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
            getReceiveTableData({ page_no, page_size }).then(res => {
                this.tableData = res.data.data
                this.totalNum = res.data.count
            })
        },
        deleteOk () {
            let id = this.operateId
            deleteReceiveData({ id }).then(res => {
                this.$Message.success('成功删除领取记录!')
                this.load()
            })
        },
        deleteCancel () {
            this.deleteModal = false
        },
        changeDate (event) {
        },

        handleSubmit (row) {
            let id = this.operateId
            editReceiveData({ id }).then(res => {
                if (res.data.code == '2') {
                    this.$Message.error(res.data.msg)
                    return
                } else {
                    this.$Message.success('领取成功！')
                    this.handleReset()
                    this.load()
                }
            })
        },
        handleReset () {
            this.formValidate.id = null
            this.formValidate.status = null
            this.operateModal = false
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
