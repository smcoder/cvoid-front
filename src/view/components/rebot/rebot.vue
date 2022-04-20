<template>
    <div>
        <Row style="background:#eee;padding:20px">
            <Col span="11">
                <Card shadow>
                    <p>询问内容：</p>
                    <p>&nbsp;</p>
                    <p><Input v-model="formCustom.key" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input></p>
                    <p>&nbsp;</p>
                    <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
                </Card>

            </Col>
            <Col span="11" offset="2">
                <Card shadow>
                    <p>客服回复：</p>
                </Card>
            </Col>
        </Row>
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
            formCustom: {
                key: '',
            }
        }
    },
    methods: {
        handleSubmit () {

        }
    }
}
</script>

<style>

</style>
