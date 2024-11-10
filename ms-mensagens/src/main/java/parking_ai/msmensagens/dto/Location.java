package parking_ai.msmensagens.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * Classe de Endereco Location: Latitude e Longitude (POJO)
 */
@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
public class Location {

    private double lat;

    private double lng;    

}