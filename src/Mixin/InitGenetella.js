export default {
    methods: {
        setContentHeight() {
            var $BODY = $('body')
            var $LEFT_COL = $('.left_col')
            var $RIGHT_COL = $('.right_col')
            var $SIDEBAR_FOOTER = $('.sidebar-footer')
            var $FOOTER = $('footer')
            var $NAV_MENU = $('.nav_menu')

            $RIGHT_COL.css('min-height', $(window).height())

            var bodyHeight = $BODY.outerHeight()
            var footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height()
            var leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height()
            var contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight

            // normalize content
            contentHeight -= $NAV_MENU.height() + footerHeight

            $RIGHT_COL.css('min-height', contentHeight)
        },
        togglePanel() {
            var $BOX_PANEL = $(event.target).closest('.x_panel')
            var $ICON = $(event.target).find('i')
            var $BOX_CONTENT = $BOX_PANEL.find('.x_content')

            // fix for some div with hardcoded fix class
            if ($BOX_PANEL.attr('style')) {
                $BOX_CONTENT.slideToggle(200, function () {
                    $BOX_PANEL.removeAttr('style');
                });
            } else {
                $BOX_CONTENT.slideToggle(200)
                $BOX_PANEL.css('height', 'auto')
            }

            $ICON.toggleClass('fa-chevron-up fa-chevron-down')
        },
        dismissPanel() {
            var $BOX_PANEL = $(event.target).closest('.x_panel')

            $BOX_PANEL.remove()

            this.setContentHeight()
        }
    }
}