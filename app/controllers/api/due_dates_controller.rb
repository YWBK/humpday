class Api::DueDatesController < ApplicationController
    def update
        @due_date = DueDate.find
    end
end
