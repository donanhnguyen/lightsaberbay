class Api::LightsabersController < ApplicationController
    def index
        @user = User.find(params[:user_id])
        @all_users_lightsabers = @user.lightsabers
        @all_lightsabers = Lightsaber.all
        render :index
    end

    def create
      @user = User.find(params[:user_id])
      @budget = @user.budgets.create(budget_params)
      if @budget.save
        render :show
      else
        render json: @budget.errors, status: :unprocessable_entity
      end
    end

    def update
      @budget = Budget.find(params[:id])
      @budget.update_attributes(budget_params)
      render :show
    end

    def destroy
      @budget = Budget.find(params[:id])
      @budget.destroy
      render :show
    end

    private

    def budget_params
      params.require(:budget).permit(
        :month,
        :year,
        :salary,
        :user_id,
      )
    end
end
