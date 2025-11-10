"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Car,
  Calendar,
  Palette,
  Shield,
  MapPin,
  FileText,
  X,
} from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { KentekenCheck } from "rdw-kenteken-check";
import { useLanguage } from "@/lib/i18n";

interface CarData {
  kenteken: string;
  voertuigsoort: string;
  merk: string;
  handelsbenaming: string;
  eerste_kleur: string;
  tweede_kleur?: string;
  aantal_zitplaatsen?: string;
  aantal_staanplaatsen?: string;
  datum_eerste_toelating: string;
  datum_eerste_tenaamstelling_in_nederland: string;
  wam_verzekerd: string;
  aantal_cilinders?: string;
  cilinderinhoud?: string;
  massa_ledig_voertuig?: string;
  toegestane_maximum_massa_voertuig?: string;
  massa_rijklaar?: string;
  maximum_massa_trekken_ongeremd?: string;
  maximum_massa_trekken_geremd?: string;
  datum_afgifte_apskeuring?: string;
  datum_einde_apskeuring?: string;
  indicatie_snelheid?: string;
  laadvermogen?: string;
  oplegger_geremd?: string;
  aanhangwagen_autonoom_remmen?: string;
  aanhangwagen_middenas?: string;
  aantal_wielen?: string;
  aantal_assen?: string;
  handelsbenaming_uitgebreid?: string;
  vermogen_massaverhouding?: string;
  uitvoering?: string;
  variant?: string;
  uitvoering_volgnummer?: string;
  volgnummer_wijziging_eu_typegoedkeuring?: string;
  vermogen_brom_snorfiets?: string;
  datum_tenaamstelling?: string;
  nettomaximumvermogen?: string;
  vervaldatum_apk?: string;
  taxi_indicator?: string;
  maximum_massa_samenstelling?: string;
  aantal_deuren?: string;
  aantal_wielen_aangedreven?: string;
  carrosserie?: string;
  carrosserie_specifiek?: string;
  brandstof_omschrijving?: string;
  brandstof_volgnummer?: string;
  emissiecode_omschrijving?: string;
  emissiecode_volgnummer?: string;
  europese_voertuigcategorie?: string;
  europese_voertuigcategorie_toevoeging?: string;
  europese_uitvoeringcategorie_toevoeging?: string;
  plaats_chassisnummer?: string;
  technische_max_massa_voertuig?: string;
  type?: string;
  type_gasinstallatie_omschrijving?: string;
  typegoedkeuringsnummer?: string;
  variant_as_omschrijving?: string;
  wielbasis?: string;
  export_indicator?: string;
  openstaande_terugroepactie_indicator?: string;
  vervaldatum_tachograaf?: string;
  taxi_indicator_geldig_tot?: string;
  maximum_last_onder_de_vooras_sen?: string;
  maximum_last_onder_de_achteras_sen?: string;
  co2_uitstoot_gecombineerd?: string;
  co2_uitstoot_gewogen?: string;
  netto_maximum_vermogen?: string;
  massa_alt_aandrijving?: string;
  nettomaximumvermogen_hybride?: string;
  nedc_co2?: string;
  wltp_co2_uitstoot_gecombineerd?: string;
  wltp_co2_uitstoot_laag?: string;
  wltp_co2_uitstoot_middel?: string;
  wltp_co2_uitstoot_hoog?: string;
  wltp_co2_uitstoot_extra_hoog?: string;
  gem_lading_ah?: string;
  gem_lading_wh?: string;
  actieradius_wltp?: string;
  gem_energieverbruik_wltp_gecombineerd?: string;
  gem_energieverbruik_wltp_laag?: string;
  gem_energieverbruik_wltp_middel?: string;
  gem_energieverbruik_wltp_hoog?: string;
  gem_energieverbruik_wltp_extra_hoog?: string;
  gem_brandstofverbruik_wltp_gecombineerd?: string;
  gem_brandstofverbruik_wltp_laag?: string;
  gem_brandstofverbruik_wltp_middel?: string;
  gem_brandstofverbruik_wltp_hoog?: string;
  gem_brandstofverbruik_wltp_extra_hoog?: string;
  gem_brandstofverbruik_buiten_bebouwde_kom?: string;
  gem_brandstofverbruik_gecombineerd?: string;
  gem_brandstofverbruik_stad?: string;
  geluidsniveau_rijdend?: string;
  geluidsniveau_stationair?: string;
  geluidsniveau_stationair_toerental?: string;
  co_uitstoot?: string;
  hc_uitstoot?: string;
  nox_uitstoot?: string;
  hc_nox_uitstoot?: string;
  particulates_uitstoot?: string;
  massa_bedrijfsklaar?: string;
  wegbelasting_kwartaal_minimum?: string;
  wegbelasting_kwartaal_maximum?: string;
  wegbelasting_jaar_minimum?: string;
  wegbelasting_jaar_maximum?: string;
  catalogusprijs?: string;
  bpm?: string;
  g3_installatie_aanwezig?: string;
  aantal_rolstoelplaatsen?: string;
  maximum_ondersteunende_snelheid?: string;
  jaar_laatste_registratie_tellerstand?: string;
  tellerstandoordeel?: string;
  code_toelichting_tellerstandoordeel?: string;
  tenaamstelling_dt?: string;
  vervaldatum_apk_dt?: string;
  datum_eerste_toelating_dt?: string;
  datum_eerste_tenaamstelling_in_nederland_dt?: string;
  datum_afgifte_apskeuring_dt?: string;
  datum_einde_apskeuring_dt?: string;
  vervaldatum_tachograaf_dt?: string;
  maximum_last_onder_de_vooras_sen_tezamen_koppeling?: string;
  type_remsysteem_voertuig_code?: string;
  rupsonderstelconfiguratie?: string;
  wielbasis_voertuig_minimum?: string;
  wielbasis_voertuig_maximum?: string;
  lengte?: string;
  maximale_constructiesnelheid?: string;
  breedte?: string;
  hoogte_voertuig?: string;
  hoogte_voertuig_minimum?: string;
  hoogte_voertuig_maximum?: string;
  wielbasis_voertuig?: string;
  technische_max_massa_samenstelling?: string;
}

interface CarDetailModalProps {
  car: CarData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CarDetailModal({
  car,
  isOpen,
  onClose,
}: CarDetailModalProps) {
  const { t } = useLanguage();

  if (!car) return null;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    if (/^\d{8}$/.test(dateString)) {
      const year = dateString.slice(0, 4);
      const month = dateString.slice(4, 6);
      const day = dateString.slice(6, 8);
      return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "N/A"
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  const formatValue = (value: any) => {
    if (value === null || value === undefined || value === "") return "N/A";
    return String(value);
  };

  const formattedLicensePlate = new KentekenCheck(car.kenteken).formatLicense();

  const basicInfo = [
    {
      label: t("car.licensePlate"),
      value: formattedLicensePlate,
      icon: FileText,
    },
    { label: t("car.brand"), value: car.merk, icon: Car },
    { label: t("car.model"), value: car.handelsbenaming, icon: Car },
    { label: t("car.vehicleType"), value: car.voertuigsoort, icon: Car },
    { label: t("car.primaryColor"), value: car.eerste_kleur, icon: Palette },
  ];

  const registrationInfo = [
    {
      label: t("car.firstRegistration"),
      value: formatDate(car.datum_eerste_toelating),
      icon: Calendar,
    },
    {
      label: t("car.firstRegistrationNL"),
      value: formatDate(car.datum_eerste_tenaamstelling_in_nederland),
      icon: MapPin,
    },
    {
      label: t("car.insuranceStatus"),
      value:
        car.wam_verzekerd === "Ja" ? t("car.insured") : t("car.notInsured"),
      icon: Shield,
    },
    {
      label: t("car.apkExpiry"),
      value: formatDate(car.vervaldatum_apk),
      icon: Calendar,
    },
  ];

  const technicalInfo = [
    { label: t("car.engineCylinders"), value: car.aantal_cilinders },
    { label: t("car.maxhp"), value: car.nettomaximumvermogen },
    {
      label: t("car.maxspeed"),
      value: car.maximale_constructiesnelheid,
    },
    {
      label: t("car.engineDisplacement"),
      value: car.cilinderinhoud ? `${car.cilinderinhoud} cc` : undefined,
    },
    {
      label: t("car.emptyWeight"),
      value: car.massa_ledig_voertuig
        ? `${car.massa_ledig_voertuig} kg`
        : undefined,
    },
    {
      label: t("car.maxWeight"),
      value: car.toegestane_maximum_massa_voertuig
        ? `${car.toegestane_maximum_massa_voertuig} kg`
        : undefined,
    },
    { label: t("car.seats"), value: car.aantal_zitplaatsen },
    { label: t("car.doors"), value: car.aantal_deuren },
    { label: t("car.fuelType"), value: car.brandstof_omschrijving },
    { label: t("car.bodyType"), value: car.carrosserie },
  ];

  const environmentalInfo = [
    {
      label: t("car.co2Emissions"),
      value: car.co2_uitstoot_gecombineerd
        ? `${car.co2_uitstoot_gecombineerd} g/km`
        : undefined,
    },
    {
      label: t("car.wltpCo2"),
      value: car.wltp_co2_uitstoot_gecombineerd
        ? `${car.wltp_co2_uitstoot_gecombineerd} g/km`
        : undefined,
    },
    {
      label: t("car.fuelConsumption"),
      value: car.gem_brandstofverbruik_gecombineerd
        ? `${car.gem_brandstofverbruik_gecombineerd} l/100km`
        : undefined,
    },
    {
      label: t("car.energyConsumption"),
      value: car.gem_energieverbruik_wltp_gecombineerd
        ? `${car.gem_energieverbruik_wltp_gecombineerd} Wh/km`
        : undefined,
    },
    { label: t("car.emissionCode"), value: car.emissiecode_omschrijving },
  ];

  const isImported =
    car.datum_eerste_tenaamstelling_in_nederland !== car.datum_eerste_toelating;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-effect border-white/10 ">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30">
                <Car className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <DialogTitle className="text-2xl text-white">
                  {formattedLicensePlate}
                </DialogTitle>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isImported && (
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  {t("car.imported")}
                </Badge>
              )}
              <Badge
                className={`${
                  car.wam_verzekerd === "Ja"
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                }`}
              >
                {car.wam_verzekerd === "Ja"
                  ? t("car.insured")
                  : t("car.notInsured")}
              </Badge>
              <DialogPrimitive.Close
                className="p-2 glass-effect rounded-lg border border-white/10 flex items-center justify-center transition hover:opacity-80 focus:outline-none"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <X className="w-6 h-6 text-blue-400" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </div>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-400" />
                {t("car.basicInformation")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {basicInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0"
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{item.label}</span>
                  </div>
                  <span className="text-white font-medium">
                    {formatValue(item.value)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-400" />
                {t("car.registration")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {registrationInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0"
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{item.label}</span>
                  </div>
                  <span className="text-white font-medium">
                    {formatValue(item.value)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                {t("car.technicalSpecs")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {technicalInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0"
                >
                  <span className="text-gray-300 text-sm">{item.label}</span>
                  <span className="text-white font-medium">
                    {formatValue(item.value)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                {t("car.environmental")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {environmentalInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0"
                >
                  <span className="text-gray-300 text-sm">{item.label}</span>
                  <span className="text-white font-medium">
                    {formatValue(item.value)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
