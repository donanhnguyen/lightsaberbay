class Api::LightsabersController < ApplicationController
    def index
        if params[:user_id]
          @user = User.find(params[:user_id])
          @all_lightsabers = @user.lightsabers
          render :index
        else 
          @all_lightsabers = Lightsaber.all
          render :index
        end
    end

    def create
      @user = User.find(params[:user_id])
      @lightsaber = @user.lightsabers.create(lightsaber_params)
      if @lightsaber.save
        render :show
      else
        render json: @lightsaber.errors, status: :unprocessable_entity
      end
    end

    def update
      @lightsaber = Lightsaber.find(params[:id])
      @lightsaber.update_attributes(lightsaber_params)
      render :show
    end

    def destroy
      @lightsaber = Lightsaber.find(params[:id])
      @lightsaber.destroy
      render :show
    end

    private

    def lightsaber_params
      params.require(:lightsaber).permit(
        :name,
        :style,
        :price,
        :color,
        :forsale,
        :lat,
        :lng,
        :user_id
      )
    end
end
