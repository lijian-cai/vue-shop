import Vue from 'vue'
import { Form, FormItem, Button, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 将Message挂载到Vue原型中的message属性，这样就可以通过this.$message来访问组件
Vue.prototype.$message = Message