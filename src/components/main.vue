<!-- main.vue -->
<template>
	<div class="wrap">
		<div class="btn_wrap">
			<el-button type="button" @click="handelAdd(cron)">添加</el-button>
		</div>

		<div class="cron_group">
			<el-dialog class="cron_exp_dialog" :visible.sync="dialogBoxVisible">
				<label>cron表达式：</label>
            	<span class="span_cron" @click="dialogCronExpVisible=true">{{cron}}</span>
            	<el-button type="button" @click="handelSub">确定</el-button>
			</el-dialog>
        </div>
        <!-- 定时表达式cron -->
        <el-dialog class="cron_exp_dialog" :title="time_title" :visible.sync="dialogCronExpVisible" append-to-body>
            <cron-time @getCronExp="handleCronExp" :cron_express="cron" :operate_type="operate_type"></cron-time>
        </el-dialog>
        <el-table
            :data="tableData"
            style="width:70%; margin: 0 auto;"
            border>
            <el-table-column header-align="center"
                label="定时表达式"
                prop="cron_exp">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                header-align="center"
                width="250">
	            <template slot-scope="scope">
	                <el-button type="text" size="small" @click="handelEdit(scope.$index, scope.row)">修改</el-button>
	                <el-button type="text" size="small" @click="handelDel(scope.$index)">删除</el-button>
	            </template>
            </el-table-column>
        </el-table>
	</div>
</template>

<script>
	import cronTime from './cronTime'
	export default {
		data () {
			return {
				dialogCronExpVisible: false,
				dialogBoxVisible: false,
				time_title: '定时设置',
				operate_type: 'add',
				edit_index: 0,
				cron: '',
				tableData: [{
					cron_exp: '* * * * 2,6 ? 2018-2022'
				}, {
					cron_exp: '* * * * 2,4,6 ? 2018-2022'
				}, {
					cron_exp: '* * * * 4,6 ? 2018-2020'
				}]
			}
		},
	    components: { cronTime },
	    methods: {
	    	handleCronExp (exp) {
		        this.cron = exp
		        this.dialogCronExpVisible = false
		        console.log(this.cron, exp)
		    },
		    handelAdd (cron) {
		    	this.operate_type = 'add'
		    	this.dialogBoxVisible = true
		    	
		    },
		    handelEdit (index, row) {
		    	this.edit_index = index
		    	this.operate_type = 'edit'
		    	this.dialogBoxVisible = true
		    	this.cron = row.cron_exp
		    },
		    handelDel (index) {
		    	this.tableData.splice(index, 1)
		    },
		    handelSub () {
		    	this.dialogBoxVisible = false
		    	if (this.operate_type === 'add') {
		    		this.tableData.push({'cron_exp': this.cron})
		    	} else {
		    		this.tableData[this.edit_index].cron_exp = this.cron
		    	}
		    }
	    }
	}
</script>
<style scoped>
	.cron_group {
		width: 60%;
		height: 40px;
		margin: 0 auto;
		margin-bottom: 60px;
	}
	.cron_group label {
		display: inline-block;
		width: 15%;
		height: 40px;
		line-height: 40px;
		float: left;
	}
	.span_cron {
		float: left;
	    width: 70%;
	    font-size: 14px;
	    display: inline-block;
	    -webkit-appearance: none;
	    background-color: #fff;
	    border-radius: 4px;
	    border: 1px solid #dcdfe6;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    color: #606266;
	    height: 40px;
	    line-height: 40px;
	    text-align: left;
	    outline: 0;
	    padding: 0 15px;
	}

</style>
