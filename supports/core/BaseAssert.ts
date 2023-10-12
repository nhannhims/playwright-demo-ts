import { expect } from '@playwright/test'
import { Control } from './Control'
export const assertEqual = async (actual: any, expected: any) => {
    expect(actual).toEqual(expected)
}

export const assertVisible = async (element: Control, dynamic?: string) => {
    if (dynamic == undefined || dynamic == '') {
        expect(element.get()).toBeVisible()
    } else {
        expect(element.setDynamicLocator(dynamic).get()).toBeVisible()
    }
}

export const assertNotVisible = async (element: Control, dynamic?: string) => {
    let visibleFlag = false
    if (dynamic == undefined || dynamic == '') {
        visibleFlag = await element.checkInVisible()
        expect(visibleFlag).toBeTruthy()
    } else {
        visibleFlag = await element.setDynamicLocator(dynamic).checkInVisible()
        expect(visibleFlag).toBeTruthy()
    }
}