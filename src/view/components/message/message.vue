<template>
    <div>
        <Card>
            <tables ref="tables" v-model="tableData" :columns="columns"
                    @on-delete="handleDelete"/>
            <Page :total="totalCount" show-total/>
        </Card>
    </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'

export default {
    name: 'tables_page',
    components: {
        Tables
    },
    data () {
        return {
            columns: [
                { title: 'ID', key: 'id' },
                { title: '公告标题', key: 'title' },
                { title: '回复内容', key: 'content' },
                { title: '留言人', key: 'createName' },
                { title: '修改人', key: 'modifyUserName' },
                { title: '修改时间', key: 'modify_time' },
                { title: '创建日期', key: 'create_time' },
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

                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            tableData: [],
            totalCount: 0
        }
    },
    methods: {
        handleDelete (params) {
            console.log(params)
        }
    },
    mounted () {
        getTableData().then(res => {
            this.tableData = res.data
            this.totalCount = res.data.count
        })
    }
}
</script>

<style>

</style>
