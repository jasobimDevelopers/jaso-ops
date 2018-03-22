<template>
  <div class="menu_section">
    <ul class="nav side-menu" id="menu">
      <li v-for="(item, index) in menuItems" :class="{'active':index==0}">
        <a @click='itemClicked(item, $event,index)' :href='menuUrl(item)'>
          <i v-bind:class="[ item.class ]"></i> <span class="tit">{{ item.title }}</span>
        </a>
        <ul class="nav child_menu" v-if="item.childs && item.childs.length > 0">
            <!--v-for遍历有一个序号参数index ；单击绑定函数传参 index   类名绑定 当act的值等于当前index时增加类名active； -->
          <li v-for="(child,index) in item.childs" @click="addclassfun(index)" v-bind:class="{activ:index==act}">
            <router-link :to="child.view">{{ child.title }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                "menuItems": [],
                "act":"false",
                 items:[]
            }
        },
        created() {
            var vm = this;
            this.$root.ajax('data/menus.json', {}, function (data) {
                vm.$data.groupName = data.groupName;
                vm.$data.menuItems = data.menuItems;
            })
        },

      created(){
        this.$http.get('/data/menus').then((data) =>{
          this.items = data.body.data;
        })
      },

        mounted() {
        },
        methods: {
            addclassfun:function(index) {
                //alert(index)n不能从0开始  刷新单击第一个没效果
                this.act = index;//点击时 act值等于当前index
            },
            menuUrl(menu) {
                if (menu.view) {
                    return "/#" + menu.view
                } else {
                    return "#"
                }
            },
            itemClicked(view, source,index) {    //视图   来源   当前页面
//                this.toggleMenu(event.target,index);
                this.toggleMenu(view.target,index);
                this.act="false";
            },
            toggleMenu(link,index) {
                var $li = $('#menu>li').eq(index);
                var $BODY = $('body');
                var $SIDEBAR_MENU = $('#sidebar-menu');
                var $VM = this;
                if ($li.is('.active')) {
                    $li.children('ul>li').addClass('active');
                    $li.removeClass('active active-sm');
                    $('ul:first', $li).slideUp(function () {
                        $VM.$root.setContentHeight()
                    });
                } else {
                    // 点击子菜单关闭其他菜单
                    if (!$li.parent().is('.child_menu')) {
                        $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                        $SIDEBAR_MENU.find('li ul').slideUp()
                    } else {
                        if ($BODY.is(".nav-sm")) {
                            $SIDEBAR_MENU.find("li").removeClass("active active-sm");
                            $SIDEBAR_MENU.find("li ul").slideUp()
                        }
                    }
                    $li.addClass('active');
                    $('ul:first', $li).slideDown(function () {
                        $VM.$root.setContentHeight()
                    })
                }
            }
        }
    }
</script>
