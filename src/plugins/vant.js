import Vue from 'vue'
import Vant, { Locale } from 'vant'
import 'vant/lib/index.css'
import '../vant-variables.less'
import { Lazyload } from 'vant'
import { Notify } from 'vant'

Vue.use(Lazyload);
Vue.use(Notify);
Vue.use(Vant)
