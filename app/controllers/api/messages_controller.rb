class Api::MessagesController < ApplicationController

    def index
        @user = User.find(params[:user_id])
        @user_messages = @user.messages
        render :index
    end

    def create
      @user = User.find(params[:user_id])
      @message = @user.messages.create(message_params)
      if @message.save
        render :show
      else
        render json: @message.errors, status: :unprocessable_entity
      end
    end

    def update
      @message = Message.find(params[:id])      
      @message.update_attributes(message_params)
      render :show
    end

    private

    def message_params
      params.require(:message).permit(
        :sender,
        :body,
        :read
      )
    end
end
