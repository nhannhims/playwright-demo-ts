import { Page, expect } from '@playwright/test'
import { Control } from './Control'
import { SHORT_TIMEOUT } from '../helps/Constants'

/**
 * Execure check result equal
 * @param actual : Actual result
 * @param expected : Expected result
 */
export const assertEqual = async (actual: any, expected: any) => {
    expect(actual).toEqual(expected)
}

/**
 * Execute Number 1 greater than Number 2
 * @param numberOne 
 * @param numberTwo 
 */
export const assertGreaterThan = async (numberOne: number | bigint, numberTwo: number | bigint) => {
    expect(numberOne).toBeGreaterThan(numberTwo)
}

/**
 * Execute check element visible
 * @param element : Control name declare from Control Class
 * @param dynamic : (Optional) : Use incase use dynamic locator
 */
export const assertVisible = async (element: Control, dynamic?: string) => {
    if (dynamic == undefined || dynamic == '') {
        await expect(element.get()).toBeVisible()
    } else {
        await expect(element.setDynamicLocator(dynamic).get()).toBeVisible()
    }
}

/**
 * Execute check element not visible
 * @param element : Control name declare from Control Class
 * @param dynamic : (Optional) : Use incase use dynamic locator
 */
export const assertNotVisible = async (element: Control, dynamic?: string) => {
    if (dynamic == undefined || dynamic == '') {
        await expect(element.get()).toBeVisible({ visible: false })
    } else {
        await expect(element.setDynamicLocator(dynamic).get()).toBeVisible({ visible: false })
    }
}

/**
 * Execute check have url
 * @param page : Page 
 * @param url : expected url
 */
export const assertHaveUrl = async (page: Page, url: string | RegExp) => {
    await expect(page).toHaveURL(url, { timeout: SHORT_TIMEOUT })
}

/**
 * Execute check do not have url
 * @param page : Page
 * @param url : expected url
 */
export const assertNotHaveUrl = async (page: Page, url: string | RegExp) => {
    await expect(page).not.toHaveURL(url, { timeout: SHORT_TIMEOUT })
}