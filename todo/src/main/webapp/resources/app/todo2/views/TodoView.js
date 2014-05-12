define([ 'backbone', 'jquery', 'underscore', 'handlebars', 'text!app/todo2/hbss/todo.hbs' ], function(Backbone, $, _,
        Handlebars, todoHbs) {

    return Backbone.View.extend({

        tagName : "tr",
        template : Handlebars.compile(todoHbs),
        events : {
            "click .toggle" : "toggleCompleted",
            "click label" : "beginEditing",
            "keyup .title" : "doEditing",
            "blur .title" : "finishEditing",
            "click .destroy" : "destroy"
        },

        initialize : function() {
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "destroy", this.remove);
        },
        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass("completed", this.model.get("completed"));
            this.$titleInput = this.$(".title");
            return this;
        },
        toggleCompleted : function() {
            this.model.toggleCompleted().save();
        },
        beginEditing : function() {
            this.$el.addClass("editable");
            this.$titleInput.focus();
        },
        doEditing : function(event) {
            if (event.keyCode === 13) {
                this.model.save({
                    title : this.$titleInput.val()
                });
                this.finishEditing();
            }
        },
        finishEditing : function() {
            this.$el.removeClass("editable");
            this.$titleInput.val(this.model.get("title"));
        },
        destroy : function() {
            this.model.destroy();
        }

    });

});
