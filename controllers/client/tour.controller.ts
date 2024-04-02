import { Request, Response } from "express";
import Tour from "../../models/tour.model";

export const index = async (req : Request, res : Response) => {
    //SELECT * FROM tours WHERE deleted = false AND status = "active";
    const tours = await Tour.findAll({
        where: {
            deleted : false,
            status: "active"
        },
        raw : true
    });
    res.render("client/pages/tours/index.pug", {
        pageTitle : "Danh sach tour",
        tours : tours
    })
}