import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";

export const index = async (req : Request, res : Response) => {
    const slugCategory = req.params.slugCategory;

    const tours = await sequelize.query(`
        SELECT tours.*
        FROM tours
        JOIN tours_categories ON tours.id = tours_categories.tour_id
        JOIN categories ON tours_categories.category_id = categories.id
        WHERE
            categories.slug = '${slugCategory}'
            AND categories.deleted = false
            AND categories.status = 'active'
            AND tours.deleted = false
            AND tours.status = 'active';
    `, {
        type : QueryTypes.SELECT,
        raw : true
    });

    for(const tour of tours) {
        if(tour["images"]) {
            const images = JSON.parse(tour["images"]);
            tour["image"] = images[0];

            tour["price_special"] = tour["price"] * (1- tour["discount"]/100);
        }
    }
   
    res.render("client/pages/tours/index.pug", {
        pageTitle : "Danh sach tour",
        tours : tours
    })
}