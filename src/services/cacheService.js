import { LRUCache } from "lru-cache";
import { CACHE_MAX_SIZE, CACHE_TTL } from "../static/constant.js";
import { makeErrorResponse, makeSuccessResponse } from "./apiService.js";

const cache = new LRUCache({
  max: CACHE_MAX_SIZE,
  ttl: CACHE_TTL,
});

const putKey = async (req, res) => {
  try {
    const { key, session, time } = req.body;
    if (!key || !session || !time) {
      return makeErrorResponse({
        res,
        message: "All fields are required",
      });
    }
    cache.set(key, { session, time });
    return makeSuccessResponse({
      res,
      message: "Key put success",
    });
  } catch (error) {
    return makeErrorResponse({ res, message: error.message });
  }
};

const getKey = async (req, res) => {
  try {
    const key = req.params.key;
    const data = cache.get(key);
    return makeSuccessResponse({
      res,
      message: "Get key success",
      data: { key, ...data },
    });
  } catch (error) {
    return makeErrorResponse({ res, message: error.message });
  }
};

const removeKey = async (req, res) => {
  try {
    const key = req.params.key;
    const data = cache.get(key);
    if (!data) {
      return makeSuccessResponse({ res, message: "Key not found" });
    }
    cache.delete(key);
    return makeSuccessResponse({
      res,
      message: "Key deleted",
      data: { key, ...data },
    });
  } catch (error) {
    return makeErrorResponse({ res, message: error.message });
  }
};

const checkSession = async (req, res) => {
  try {
    const { key, session } = req.body;
    const value = cache.get(key);
    const isValid = value ? value.session === session : false;
    return makeSuccessResponse({
      res,
      message: "Check session success",
      data: { isValid },
    });
  } catch (error) {
    return makeErrorResponse({ res, message: error.message });
  }
};

const getKeysByPattern = async (req, res) => {
  try {
    const pattern = req.params.pattern;
    const regex = new RegExp("^" + pattern.replace("*", ".*") + "$");

    const matchedKeys = Array.from(cache.entries())
      .filter(([key]) => regex.test(key))
      .map(([key, value]) => ({ key, ...value }));

    if (matchedKeys.length === 0) {
      return makeSuccessResponse({
        res,
        message: "No matching keys found",
      });
    }

    return makeSuccessResponse({
      res,
      message: "Get keys by pattern success",
      data: matchedKeys,
    });
  } catch (error) {
    return makeErrorResponse({ res, message: error.message });
  }
};

const removeKeysByPattern = async (req, res) => {
  try {
    const pattern = req.params.pattern;
    const regex = new RegExp("^" + pattern.replace("*", ".*") + "$");

    const deletedKeys = [];
    for (const key of cache.keys()) {
      if (regex.test(key)) {
        deletedKeys.push({ key, ...cache.get(key) });
        cache.delete(key);
      }
    }

    if (deletedKeys.length === 0) {
      return makeSuccessResponse({ res, message: "No matching keys found" });
    }

    return makeSuccessResponse({
      res,
      message: "Remove keys by pattern success",
      data: deletedKeys,
    });
  } catch (error) {
    return makeErrorResponse({ res, message: error.message });
  }
};

const resetCache = async (req, res) => {
  try {
    cache.clear();
    return makeSuccessResponse({
      res,
      message: "Cache reset success",
    });
  } catch (error) {
    return makeErrorResponse({ res, message: error.message });
  }
};

const getAllKeys = async (req, res) => {
  try {
    const allKeys = Array.from(cache.entries()).map(([key, value]) => ({
      key,
      ...value,
    }));

    if (allKeys.length === 0) {
      return makeSuccessResponse({
        res,
        message: "No keys found",
        data: [],
      });
    }

    return makeSuccessResponse({
      res,
      message: "Get all keys success",
      data: allKeys,
    });
  } catch (error) {
    return makeErrorResponse({ res, message: error.message });
  }
};

export {
  putKey,
  getKey,
  removeKey,
  checkSession,
  getKeysByPattern,
  removeKeysByPattern,
  resetCache,
  getAllKeys,
};
