package com.company.NearTube.page;

import com.company.NearTube.domain.Location;
import com.company.NearTube.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/locations")
public class LocationPageController {

    private final LocationService locationService;

    @RequestMapping("")
    public String locationList(Model model){
        Iterable<Location> locations = locationService.findAll();
        model.addAttribute("locations", locations);
        return "locations/list";
    }
}
