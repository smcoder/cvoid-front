<template>
    <div>
        <Card>
            <Button type="success" long @click="addTopic">新增</Button>
            <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"/>
            <Page :total="totalNum" show-total/>
        </Card>

        <Modal
            v-model="deleteModal"
            title="确认"
            @on-ok="deleteOk"
            @on-cancel="deleteCancel">
            <p>是否删除当前数据？</p>
        </Modal>


        <Modal
            v-model="operateModal"
            :title="titleName">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="关键字" prop="title">
                    <Input v-model="formValidate.key" placeholder="请输入关键字"></Input>
                </FormItem>
                <FormItem label="内容" prop="content">
                    <Input v-model="formValidate.content" placeholder="请输入内容"></Input>
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
import { getTopicList, deleteTopicData, addTopicData, editTopicData } from '@/api/data'
import { getUserId } from '@/libs/util'

export default {
    name: 'tables_page',
    components: {
        Tables
    },
    data () {
        return {
            columns: [
                { title: 'ID', key: 'id' },
                { title: '关键字', key: 'key' },
                { title: '内容', key: 'content' },
                {
                    title: '操作',
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
                                        this.editTopic(params.row)
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
            operateTopicId: null,
            operateModal: false,
            titleName: '',
            formValidate: {
                key: '',
                content: '',
            },
            ruleValidate: {
                key: [
                    { required: true, message: '关键字不能为空', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '内容不能为空', trigger: 'blur' }
                ],

            }
        }
    },
    methods: {
        delete (params) {
            this.operateTopicId = params.id
            this.deleteModal = true
        },
        load () {
            let page_no = this.page_no
            let page_size = this.page_size
            getTopicList({ page_no, page_size }).then(res => {
                this.tableData = res.data.data
                this.totalNum = res.data.count
            })
        },
        deleteOk () {
            let topicId = this.operateTopicId
            deleteTopicData({ topicId }).then(res => {
                this.$Message.success('成功删除关键字!')
                this.load()
            })
        },
        deleteCancel () {
            this.deleteModal = false
        },
        addTopic () {
            this.titleName = '新增关键字'
            this.operateModal = true
        },

        editTopic () {
            this.titleName = '修改关键字'
            this.formValidate.id = data.id
            this.formValidate.key = data.title
            this.formValidate.content = data.content
            this.operateModal = true
        },
        handleReset () {
            this.formValidate.key = null;
            this.formValidate.content = null;
            this.operateModal = false;
        },
        handleSubmit () {
            this.$refs['formValidate'].validate((valid) => {
                if (valid) {
                    let form = this.formValidate
                    if (this.titleName == '编辑关键字') {
                        editTopicData({ form }).then(res => {
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
                        addTopicData({ form }).then(res => {
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
        }
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
