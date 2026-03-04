declare module "react-simple-maps" {
    import * as React from "react";

    export interface ProjectionConfig {
        scale?: number;
        center?: [number, number];
        rotate?: [number, number, number];
        parallels?: [number, number];
    }

    export interface ComposableMapProps {
        projection?: string;
        projectionConfig?: ProjectionConfig;
        width?: number;
        height?: number;
        style?: React.CSSProperties;
        className?: string;
        children?: React.ReactNode;
    }

    export function ComposableMap(props: ComposableMapProps): JSX.Element;

    export interface GeographiesProps {
        geography: string | object;
        children: (args: { geographies: Geography[] }) => React.ReactNode;
    }

    export interface Geography {
        rsmKey: string;
        id: string;
        type: string;
        geometry: object;
        properties: Record<string, unknown>;
    }

    export interface GeographyProps {
        key?: string;
        geography: Geography;
        style?: {
            default?: React.CSSProperties;
            hover?: React.CSSProperties;
            pressed?: React.CSSProperties;
        };
        className?: string;
        onClick?: (event: React.MouseEvent, geo: Geography) => void;
        onMouseEnter?: (event: React.MouseEvent, geo: Geography) => void;
        onMouseLeave?: (event: React.MouseEvent, geo: Geography) => void;
    }

    export function Geographies(props: GeographiesProps): JSX.Element;
    export function Geography(props: GeographyProps): JSX.Element;

    export interface MarkerProps {
        coordinates: [number, number];
        className?: string;
        style?: React.CSSProperties;
        children?: React.ReactNode;
        onClick?: (event: React.MouseEvent) => void;
    }

    export function Marker(props: MarkerProps): JSX.Element;

    export interface ZoomableGroupProps {
        center?: [number, number];
        zoom?: number;
        minZoom?: number;
        maxZoom?: number;
        children?: React.ReactNode;
        className?: string;
        style?: React.CSSProperties;
    }

    export function ZoomableGroup(props: ZoomableGroupProps): JSX.Element;
}
